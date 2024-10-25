const title = 'estimators.TSR: '
const nudged = require('../../index')
const estimateTSR = nudged.estimators.TSR
const IDENTITY = nudged.transform.IDENTITY
const fromPolar = nudged.transform.fromPolar
const translateBy = nudged.transform.translateBy

module.exports = (ts) => {
  ts.test(title + 'basic usage with the general estimator', (t) => {
    const tr = nudged.estimate({
      estimator: 'TSR',
      domain: [{ x: 1, y: 0 }, { x: 3, y: 0 }],
      range: [{ x: 4, y: 0 }, { x: 4, y: 4 }]
    })
    const expected = translateBy(
      fromPolar({ x: 0, y: 0 }, 2, Math.PI / 2),
      { x: 4, y: -2 }
    )
    t.transformsEqual(tr, expected, 'allow TSR group')

    t.end()
  })

  ts.test(title + 'trivial point sets', (t) => {
    t.transformsEqual(
      estimateTSR([], [{ x: 0, y: 0 }]),
      IDENTITY,
      'empty domain'
    )

    t.transformsEqual(
      estimateTSR(
        [{ x: 0, y: 0 }],
        [{ x: 0, y: 0 }]
      ),
      IDENTITY,
      'domain and range equal'
    )

    t.end()
  })

  ts.test(title + 'translation', (t) => {
    t.transformsEqual(
      estimateTSR(
        [{ x: 1, y: 0 }, { x: -1, y: 0 }],
        [{ x: 2, y: 1 }, { x: 0, y: 1 }]
      ),
      { a: 1, b: 0, x: 1, y: 1 },
      'capture only translation 1,1'
    )

    t.end()
  })

  ts.test(title + 'scaling and rotating a square', (t) => {
    const dom = [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 1, y: 2 }]
    const ran = [{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 1, y: 3 }, { x: 0, y: 2 }]
    t.transformsEqual(
      estimateTSR(dom, ran),
      { a: 1, b: 1, x: 1, y: -1 },
      'scale and rotate a bit'
    )

    t.end()
  })

  ts.test(title + 'approximating non-uniform scaling', (t) => {
    const dom = [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 2 }, { x: 2, y: 2 }]
    const ran = [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 4 }, { x: 2, y: 4 }]
    t.transformsEqual(
      estimateTSR(dom, ran),
      { a: 1.5, b: 0, x: -0.5, y: 0.5 },
      'a compromise between 1x and 2x'
    )

    t.end()
  })

  ts.test(title + 'allow transform to a constant point', (t) => {
    const dom = [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 2 }]
    const ran = [{ x: 1, y: 1 }, { x: 1, y: 1 }, { x: 1, y: 1 }]
    t.transformsEqual(
      estimateTSR(dom, ran),
      { a: 0, b: 0, x: 1, y: 1 },
      'here singular transform is okay'
    )

    t.end()
  })

  ts.test(title + 'detect missing params', (t) => {
    t.throws(() => {
      estimateTSR([])
    }, 'missing range')

    t.end()
  })

  ts.test(title + 'avoids precision errors', (t) => {
    const dom = [{ x: 314.24933946532116, y: 807.8879779776474 }]
    const ran = [{ x: 314.24933946532116, y: 824.4274168968749 }]

    t.transformsEqual(
      estimateTSR(dom, ran),
      { a: 1, b: 0, x: ran[0].x - dom[0].x, y: ran[0].y - dom[0].y },
      'simple translation, no scaling or rotation'
    )

    t.end()
  })

  ts.test(title + 'handle numerically large coordinates', (t) => {
    // Note that JavaScript double precision floating point
    // has only 52 bit mantissa, and thus begins to break when
    // there are 16 significant digits (2^52≈10^16)
    let dom, ran, tr
    // const GIGA = 1e9
    const TERA = 1e12
    const PETA = 1e15
    const delta = 0.001

    // Single point, values in tera scale.
    const msg = 'should handle milli-translation in tera-scale'
    dom = [{ x: TERA, y: TERA }]
    ran = [{ x: TERA + delta, y: TERA + delta }]
    tr = estimateTSR(dom, ran)
    t.equal(tr.a, 1, msg + ' for a')
    t.equal(tr.b, 0, msg + ' for b')
    t.between(tr.x, 0.0009, 0.0011, msg + ' for x')
    t.between(tr.y, 0.0009, 0.0011, msg + ' for y')

    // Single point, value in peta scale.
    dom = [{ x: PETA, y: PETA }]
    ran = [{ x: PETA + delta, y: PETA + delta }]
    tr = estimateTSR(dom, ran)
    t.transformsEqual(
      tr,
      { a: 1, b: 0, x: 0, y: 0 },
      'should break gracefully for a milli-translation in peta-scale'
    )

    t.end()
  })
}

const title = 'estimators.SR: '
const nudged = require('../../index')
const estimateSR = nudged.estimators.SR
const SINGULAR = nudged.transform.SINGULAR
const IDENTITY = nudged.transform.IDENTITY

module.exports = (ts) => {
  ts.test(title + 'basic usage with the general estimator', (t) => {
    const tr = nudged.estimate({
      estimator: 'SR',
      domain: [{ x: 1, y: 0 }],
      range: [{ x: 0, y: 2 }],
      center: { x: 0, y: 0 }
    })
    const expected = nudged.transform.fromPolar({ x: 0, y: 0 }, 2, Math.PI / 2)
    t.transformsEqual(tr, expected, 'allow SR group')

    t.end()
  })

  ts.test(title + 'trivial point sets', (t) => {
    t.transformsEqual(
      estimateSR([], [], { x: 0, y: 0 }),
      IDENTITY,
      'empty domain and range'
    )

    t.end()
  })

  ts.test(title + 'no rotation or scaling', (t) => {
    t.transformsEqual(
      estimateSR(
        [{ x: 0, y: 0 }],
        [{ x: 0, y: 0 }],
        { x: 0, y: 0 }
      ),
      IDENTITY,
      'domain, range, and center equal'
    )

    t.transformsEqual(
      estimateSR(
        [{ x: 1, y: 0 }],
        [{ x: 0, y: 0 }],
        { x: 0, y: 0 }
      ),
      SINGULAR,
      'singular transform'
    )

    t.end()
  })

  ts.test(title + 'multiple points', (t) => {
    t.transformsEqual(
      estimateSR(
        [{ x: 0, y: 2 }, { x: 2, y: 0 }],
        [{ x: 4, y: 0 }, { x: 4, y: 2 }],
        { x: 2, y: 2 }
      ),
      { a: -0.5, b: 1, x: 5, y: 1 },
      'homothety about 2,2'
    )

    t.end()
  })

  ts.test(title + 'domain equal center', (t) => {
    t.transformsEqual(
      estimateSR(
        [{ x: 1, y: 1 }, { x: 1, y: 1 }],
        [{ x: 2, y: 2 }, { x: 2, y: 2 }],
        { x: 1, y: 1 }
      ),
      IDENTITY,
      'no scaling if same domain and center'
    )

    t.end()
  })

  ts.test(title + 'scaling and rotating a square', (t) => {
    t.transformsEqual(
      estimateSR(
        [{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 1, y: 2 }],
        [{ x: 2, y: 2 }, { x: 2, y: 2 }, { x: 1, y: 3 }, { x: 0, y: 2 }],
        { x: 1, y: 1 }
      ),
      { a: 1, b: 1, x: 1, y: -1 },
      'scaling and rotation with a bit of translation'
    )

    t.end()
  })

  ts.test(title + 'detect missing params', (t) => {
    t.throws(() => {
      estimateSR([], [])
    }, 'missing center')

    t.end()
  })
}

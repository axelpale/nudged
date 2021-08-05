const title = 'estimators.TR: '
const nudged = require('../../index')
const estimateTR = nudged.estimators.TR
const IDENTITY = nudged.transform.IDENTITY

module.exports = (ts) => {
  ts.test(title + 'basic usage with the general estimator', (t) => {
    const tr = nudged.estimate({
      estimator: 'TR',
      domain: [{ x: 1, y: 0 }, { x: 3, y: 0 }],
      range: [{ x: 4, y: 0 }, { x: 4, y: 2 }]
    })
    const expected = nudged.transform.fromPolar(1, Math.PI / 2, 4, -1)
    t.transformsEqual(tr, expected, 'allow TR group')

    t.end()
  })

  ts.test(title + 'trivial point sets', (t) => {
    t.transformsEqual(
      estimateTR([], []),
      IDENTITY,
      'empty domain and range'
    )

    t.transformsEqual(
      estimateTR(
        [{ x: 0, y: 0 }],
        [{ x: 0, y: 0 }]
      ),
      IDENTITY,
      'domain and range equal'
    )

    t.end()
  })

  ts.test(title + 'only scale', (t) => {
    t.transformsEqual(
      estimateTR(
        [{ x: 1, y: 0 }, { x: -1, y: 0 }],
        [{ x: 2, y: 0 }, { x: -2, y: 0 }]
      ),
      IDENTITY,
      'scale x2'
    )

    t.end()
  })

  ts.test(title + 'multiple points', (t) => {
    t.transformsEqual(
      estimateTR(
        [{ x: 0, y: 0 }, { x: 4, y: 0 }],
        [{ x: 4, y: 0 }, { x: 4, y: 2 }]
      ),
      { a: 0, b: 1, x: 4, y: -1 },
      'positive 90 deg and match mean'
    )

    t.end()
  })

  // TODO a rotation that causes the determinant near zero but not zero

  ts.test(title + 'detect missing params', (t) => {
    t.throws(() => {
      estimateTR([])
    }, 'missing range')

    t.end()
  })
}

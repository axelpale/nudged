const title = 'estimators.X: '
const nudged = require('../../index')
const estimateX = nudged.estimators.X
const IDENTITY = nudged.transform.IDENTITY

module.exports = (ts) => {
  ts.test(title + 'basic X with general estimator', (t) => {
    t.transformsEqual(
      nudged.estimate({
        estimator: 'X',
        domain: [],
        range: []
      }),
      IDENTITY,
      'allow X group'
    )

    t.end()
  })

  ts.test(title + 'basic X with direct estimator', (t) => {
    t.transformsEqual(
      estimateX(
        [{ x: 0, y: 0 }],
        [{ x: 1, y: 0 }]
      ),
      { a: 1, b: 0, x: 1, y: 0 },
      'simple translation along x'
    )

    t.transformsEqual(
      estimateX(
        [{ x: 0, y: 0 }],
        [{ x: 0, y: 1 }]
      ),
      IDENTITY,
      'simple translation along y'
    )

    t.end()
  })

  ts.test(title + 'multiple points', (t) => {
    t.transformsEqual(
      estimateX(
        [{ x: 1, y: 1 }, { x: 2, y: 0 }],
        [{ x: 2, y: 0 }, { x: 3, y: -1 }]
      ),
      { a: 1, b: 0, x: 1, y: 0 },
      'points go x+1 y-1'
    )

    t.end()
  })
}

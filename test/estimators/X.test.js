const title = 'estimators.X: '
const nudged = require('../../index')
const estimateX = nudged.estimators.X
const I = nudged.transform.IDENTITY

module.exports = (ts) => {
  ts.test(title + 'basic X with general estimator', (t) => {
    t.transformEqual(
      nudged.estimate({
        estimator: 'X',
        domain: [],
        range: []
      }),
      I,
      'allow X group'
    )

    t.end()
  })

  ts.test(title + 'basic X with direct estimator', (t) => {
    t.transformEqual(
      estimateX(
        [{ x: 0, y: 0 }],
        [{ x: 1, y: 0 }]
      ),
      { a: 1, b: 0, x: 1, y: 0 },
      'simple translation along x'
    )

    t.transformEqual(
      estimateX(
        [{ x: 0, y: 0 }],
        [{ x: 0, y: 1 }]
      ),
      I,
      'simple translation along y'
    )

    t.end()
  })

  ts.test(title + 'multiple points', (t) => {
    t.transformEqual(
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

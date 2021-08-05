const title = 'estimators.Y: '
const nudged = require('../../index')
const estimateY = nudged.estimators.Y
const IDENTITY = nudged.transform.IDENTITY

module.exports = (ts) => {
  ts.test(title + 'basic Y with general estimator', (t) => {
    t.transformsEqual(
      nudged.estimate({
        estimator: 'Y',
        domain: [],
        range: []
      }),
      IDENTITY,
      'allow Y group'
    )

    t.end()
  })

  ts.test(title + 'basic Y with direct estimator', (t) => {
    t.transformsEqual(
      estimateY(
        [{ x: 0, y: 0 }],
        [{ x: 1, y: 0 }]
      ),
      IDENTITY,
      'simple translation along x'
    )

    t.transformsEqual(
      estimateY(
        [{ x: 0, y: 0 }],
        [{ x: 0, y: 1 }]
      ),
      { a: 1, b: 0, x: 0, y: 1 },
      'simple translation along y'
    )

    t.end()
  })

  ts.test(title + 'multiple points', (t) => {
    t.transformsEqual(
      estimateY(
        [{ x: 1, y: 1 }, { x: 2, y: 0 }],
        [{ x: 2, y: 0 }, { x: 3, y: -1 }]
      ),
      { a: 1, b: 0, x: 0, y: -1 },
      'points go x+1 y-1'
    )

    t.end()
  })
}

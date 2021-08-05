const title = 'estimators.R: '
const nudged = require('../../index')
const estimateR = nudged.estimators.R
const IDENTITY = nudged.transform.IDENTITY
const ROT90 = nudged.transform.ROT90

module.exports = (ts) => {
  ts.test(title + 'basic usage with the general estimator', (t) => {
    const c = { x: 0, y: 0 }
    const tr = nudged.estimate({
      estimator: 'R',
      domain: [{ x: 1, y: 0 }],
      range: [{ x: 0, y: 1 }],
      center: c
    })
    t.transformsEqual(tr, ROT90, 'allow R group')

    t.end()
  })

  ts.test(title + 'trivial point sets', (t) => {
    t.transformsEqual(
      estimateR([], [], { x: 0, y: 0 }),
      IDENTITY,
      'empty domain and range'
    )

    t.end()
  })

  ts.test(title + 'no rotation', (t) => {
    t.transformsEqual(
      estimateR(
        [{ x: 0, y: 0 }],
        [{ x: 0, y: 0 }],
        { x: 0, y: 0 }
      ),
      IDENTITY,
      'domain, range, and center equal'
    )

    t.transformsEqual(
      estimateR(
        [{ x: 2, y: 0 }],
        [{ x: 4, y: 0 }],
        { x: 0, y: 0 }
      ),
      IDENTITY,
      'translation away from center'
    )

    t.end()
  })

  ts.test(title + 'multiple points', (t) => {
    t.transformsEqual(
      estimateR(
        [{ x: 0, y: 2 }, { x: 2, y: 0 }],
        [{ x: 4, y: 2 }, { x: 2, y: 4 }],
        { x: 2, y: 2 }
      ),
      { a: -1, b: 0, x: 4, y: 4 },
      'positive half turn'
    )

    t.end()
  })

  ts.test(title + 'detect missing params', (t) => {
    t.throws(() => {
      estimateR([], [])
    }, 'missing center')

    t.end()
  })
}

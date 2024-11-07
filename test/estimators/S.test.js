const title = 'estimators.S: '
const nudged = require('../../index')
const estimateS = nudged.estimators.S
const SINGULAR = nudged.transform.SINGULAR
const IDENTITY = nudged.transform.IDENTITY
const X2 = nudged.transform.X2

module.exports = (ts) => {
  ts.test(title + 'basic usage with the general estimator', (t) => {
    const tr = nudged.estimate({
      estimator: 'S',
      domain: [{ x: 1, y: 0 }],
      range: [{ x: 2, y: 0 }],
      center: { x: 0, y: 0 }
    })
    t.transformsEqual(tr, X2, 'allow S group')

    t.end()
  })

  ts.test(title + 'trivial point sets', (t) => {
    t.transformsEqual(
      estimateS([], [], { x: 0, y: 0 }),
      IDENTITY,
      'empty domain and range'
    )

    t.end()
  })

  ts.test(title + 'no scaling', (t) => {
    t.transformsEqual(
      estimateS(
        [{ x: 0, y: 0 }],
        [{ x: 0, y: 0 }],
        { x: 0, y: 0 }
      ),
      IDENTITY,
      'domain, range, and center equal'
    )

    t.transformsEqual(
      estimateS(
        [{ x: 1, y: 0 }],
        [{ x: 0, y: 1 }],
        { x: 0, y: 0 }
      ),
      SINGULAR,
      'rotation about center, no scaling'
    )

    t.end()
  })

  ts.test(title + 'multiple points', (t) => {
    t.transformsEqual(
      estimateS(
        [{ x: 1, y: 1 }, { x: 3, y: 3 }],
        [{ x: 0, y: 0 }, { x: 4, y: 4 }],
        { x: 2, y: 2 }
      ),
      { a: 2, b: 0, x: -2, y: -2 },
      'homothety about 2,2'
    )

    t.transformsEqual(
      estimateS(
        [{ x: 1, y: 1 }, { x: 1, y: 1 }],
        [{ x: 2, y: 2 }, { x: 2, y: 2 }],
        { x: 0, y: 0 }
      ),
      { a: 2, b: 0, x: 0, y: 0 },
      'multiple identical points'
    )

    t.end()
  })

  ts.test(title + 'detect missing params', (t) => {
    t.throws(() => {
      estimateS([], [])
    }, 'missing center')

    t.end()
  })
}

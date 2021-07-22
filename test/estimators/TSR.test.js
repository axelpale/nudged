const title = 'estimators.TSR: '
const nudged = require('../../index')
const estimateTSR = nudged.estimators.TSR
const IDENTITY = nudged.transform.IDENTITY

module.exports = (ts) => {
  ts.test(title + 'basic usage with the general estimator', (t) => {
    const tr = nudged.estimate({
      estimator: 'TSR',
      domain: [{ x: 1, y: 0 }, { x: 3, y: 0 }],
      range: [{ x: 4, y: 0 }, { x: 4, y: 4 }]
    })
    const expected = nudged.transform.fromPolar(2, Math.PI / 2, 4, -2)
    t.transformEqual(tr, expected, 'allow TSR group')

    t.end()
  })

  ts.test(title + 'trivial point sets', (t) => {
    t.transformEqual(
      estimateTSR([], []),
      IDENTITY,
      'empty domain and range'
    )

    t.transformEqual(
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
    t.transformEqual(
      estimateTSR(
        [{ x: 1, y: 0 }, { x: -1, y: 0 }],
        [{ x: 2, y: 1 }, { x: 0, y: 1 }]
      ),
      { a: 1, b: 0, x: 1, y: 1 },
      'capture only translation 1,1'
    )

    t.end()
  })

  ts.test(title + 'detect missing params', (t) => {
    t.throws(() => {
      estimateTSR([])
    }, 'missing range')

    t.end()
  })
}

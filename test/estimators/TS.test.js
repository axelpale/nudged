const title = 'estimators.TS: '
const nudged = require('../../index')
const estimateTS = nudged.estimators.TS
const IDENTITY = nudged.transform.IDENTITY

module.exports = (ts) => {
  ts.test(title + 'basic usage with the general estimator', (t) => {
    const tr = nudged.estimate({
      estimator: 'TS',
      domain: [{ x: 1, y: 0 }, { x: 3, y: 0 }],
      range: [{ x: 2, y: 2 }, { x: 6, y: 2 }]
    })
    const expected = nudged.transform.translateBy(
      nudged.transform.fromScale({ x: 0, y: 0 }, 2),
      { x: 0, y: 2 }
    )
    t.transformsEqual(tr, expected, 'allow TS group')

    t.end()
  })

  ts.test(title + 'trivial point sets', (t) => {
    t.transformsEqual(
      estimateTS([], []),
      IDENTITY,
      'empty domain and range'
    )

    t.transformsEqual(
      estimateTS(
        [{ x: 0, y: 0 }],
        [{ x: 0, y: 0 }]
      ),
      IDENTITY,
      'domain and range equal'
    )

    t.end()
  })

  ts.test(title + 'singularity', (t) => {
    t.transformsEqual(
      estimateTS(
        [{ x: 0, y: 0 }, { x: 2, y: 0 }],
        [{ x: 1, y: -1 }, { x: 1, y: 1 }]
      ),
      { a: 0, b: 0, x: 1, y: 0 },
      'rotation 90 deg'
    )

    t.end()
  })

  ts.test(title + 'singleton domain', (t) => {
    t.transformsEqual(
      estimateTS(
        [{ x: 0, y: 0 }],
        [{ x: 1, y: 2 }, { x: 1, y: 1 }]
      ),
      { a: 1, b: 0, x: 1, y: 2 },
      'only translation with one point pair'
    )

    t.end()
  })

  ts.test(title + 'identical domain points', (t) => {
    t.transformsEqual(
      estimateTS(
        [{ x: 1, y: 1 }, { x: 1, y: 1 }],
        [{ x: 2, y: 2 }, { x: 2, y: 2 }]
      ),
      { a: 1, b: 0, x: 1, y: 1 },
      'allow identical domain points'
    )

    t.end()
  })

  // TODO a estimation that causes the determinant near zero but not zero

  ts.test(title + 'detect missing params', (t) => {
    t.throws(() => {
      estimateTS([])
    }, 'missing range')

    t.end()
  })
}

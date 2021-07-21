const title = 'estimators.L: '
const nudged = require('../../index')
const estimateL = nudged.estimators.L
const I = nudged.transform.IDENTITY

module.exports = (ts) => {
  ts.test(title + 'basic usage with the general estimator', (t) => {
    t.transformEqual(
      nudged.estimate({
        estimator: 'L',
        domain: [],
        range: [],
        angle: 0
      }),
      I,
      'allow L group'
    )

    t.transformEqual(
      nudged.estimate({
        estimator: 'L',
        domain: [{ x: 0, y: 0 }],
        range: [{ x: 1, y: 0 }],
        angle: 0
      }),
      { a: 1, b: 0, x: 1, y: 0 },
      'translation towards +x'
    )

    t.end()
  })

  ts.test(title + 'basic usage with direct estimator', (t) => {
    t.transformEqual(
      estimateL(
        [],
        []
      ),
      I,
      'empty domain, no angle'
    )

    t.transformEqual(
      estimateL(
        [{ x: 0, y: 0 }],
        [{ x: 1, y: 0 }],
        Math.PI / 2
      ),
      I,
      'orthogonal, no translation'
    )

    // 5/8 turn, should be equivalent to 1/8 turn.
    t.transformEqual(
      estimateL(
        [{ x: -2, y: -2 }],
        [{ x: 1, y: 5 }],
        Math.PI / 4
      ),
      estimateL(
        [{ x: -2, y: -2 }],
        [{ x: 1, y: 5 }],
        5 * Math.PI / 4
      ),
      '5/8 turn equivalent to 1/8 turn'
    )

    t.end()
  })

  ts.test(title + 'multiple points', (t) => {
    t.transformEqual(
      estimateL(
        [{ x: 1, y: 1 }, { x: 2, y: 0 }],
        [{ x: 1, y: 2 }, { x: 2, y: 1 }],
        Math.PI / 4
      ),
      { a: 1, b: 0, x: 0.5, y: 0.5 },
      'points go up, line goes at 45 deg'
    )

    t.end()
  })
}

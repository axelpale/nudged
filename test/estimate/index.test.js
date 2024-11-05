const title = 'estimate: '
const nudged = require('../../index')

// More tests on nudged.estimate under estimators

module.exports = (ts) => {
  ts.test(title + 'detect unexpected estimator', (t) => {
    t.throws(() => {
      nudged.estimate()
    })

    t.throws(() => {
      nudged.estimate({})
    })

    t.throws(() => {
      nudged.estimate({
        domain: [{ x: 0, y: 0 }],
        range: [{ x: 1, y: 1 }]
      })
    }, /unexpected estimator type: undefined/i)

    t.throws(() => {
      nudged.estimate({
        estimator: null,
        domain: [{ x: 0, y: 0 }],
        range: [{ x: 1, y: 1 }]
      })
    }, /unexpected estimator type: null/i)

    t.throws(() => {
      nudged.estimate({
        estimator: 'RST',
        domain: [],
        range: []
      })
    }, /unexpected estimator type: RST/i)

    t.end()
  })
}

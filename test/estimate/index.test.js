const title = 'estimate: '
const nudged = require('../../index')

// More tests on nudged.estimate under estimators

module.exports = (ts) => {
  ts.test(title + 'detect unknown estimator', (t) => {
    t.throws(() => {
      nudged.estimate({
        estimator: 'RST',
        domain: [],
        range: []
      })
    })

    t.end()
  })
}

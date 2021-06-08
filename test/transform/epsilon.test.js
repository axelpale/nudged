const nudged = require('../../index')
const EPS = nudged.transform.EPSILON

module.exports = (ts) => {
  ts.test('case: epsilon magnitude', (t) => {
    t.ok(EPS > Number.MIN_VALUE, 'epsilon larger than MIN_VALUE')
    t.ok(EPS * EPS > Number.MIN_VALUE, 'epsilon^2 larger than MIN_VALUE')

    t.end()
  })
}

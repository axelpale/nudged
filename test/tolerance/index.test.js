const title = 'tolerance: '
const nudged = require('../../index')
const TOL = nudged.tolerance

module.exports = (ts) => {
  ts.test(title + 'tolerance magnitude', (t) => {
    t.ok(TOL > Number.MIN_VALUE, 'tolerance larger than MIN_VALUE')
    t.ok(TOL * TOL > Number.MIN_VALUE, 'tolerance^2 larger than MIN_VALUE')

    t.end()
  })
}

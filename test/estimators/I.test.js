const nudged = require('../../index')
const unit = nudged.estimators.I

module.exports = (ts) => {
  ts.test('case: happy', (t) => {
    t.deepEqual(unit(), {
      a: 1,
      b: 0,
      x: 0,
      y: 0
    })

    t.end()
  })

  ts.test('case: no effect from params', (t) => {
    const domain = [{ x: 0, y: 0 }]
    const range = [{ x: 5, y: 5 }]
    t.deepEqual(unit(domain, range), {
      a: 1,
      b: 0,
      x: 0,
      y: 0
    })

    t.end()
  })
}

const nudged = require('../../index')
const unit = nudged.transform.createFromPolar

module.exports = (ts) => {
  ts.test('case: around twice', (t) => {
    t.transformEqual(unit(1, Math.PI * 4, 0, 0), {
      a: 1,
      b: 0,
      x: 0,
      y: 0
    })

    t.end()
  })

  ts.test('case: zero scale', (t) => {
    // NOTE invalid affine transformation
    t.transformEqual(unit(0, 0, 0, 0), {
      a: 0,
      b: 0,
      x: 0,
      y: 0
    })

    t.end()
  })
}

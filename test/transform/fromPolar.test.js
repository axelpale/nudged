const title = 'transform.fromPolar: '
const nudged = require('../../index')
const fromPolar = nudged.transform.fromPolar // unit

module.exports = (ts) => {
  ts.test(title + 'around twice', (t) => {
    t.transformsEqual(fromPolar(1, Math.PI * 4, 0, 0), {
      a: 1,
      b: 0,
      x: 0,
      y: 0
    })

    t.end()
  })

  ts.test(title + 'zero scale', (t) => {
    // NOTE invalid affine transformation
    t.transformsEqual(fromPolar(0, 0, 0, 0), {
      a: 0,
      b: 0,
      x: 0,
      y: 0
    })

    t.end()
  })
}

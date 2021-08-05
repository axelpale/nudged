const title = 'transform.fromPolar: '
const nudged = require('../../index')
const fromPolar = nudged.transform.fromPolar // unit

module.exports = (ts) => {
  ts.test(title + 'example', (t) => {
    const tr = fromPolar({ x: 4, y: 2 }, 2, 0)
    const p = nudged.point.transform({ x: 2, y: 1 }, tr)
    t.deepEqual(p, {
      x: 0,
      y: 0
    })

    t.end()
  })

  ts.test(title + 'zero scale', (t) => {
    // NOTE invalid affine transformation
    const center = { x: 4, y: 2 }
    t.transformsEqual(fromPolar(center, 0, 0), {
      a: 0,
      b: 0,
      x: 4,
      y: 2
    })

    t.end()
  })
}

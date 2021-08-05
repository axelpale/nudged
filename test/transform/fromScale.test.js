const title = 'transform.fromScale: '
const nudged = require('../../index')
const fromScale = nudged.transform.fromScale // unit

module.exports = (ts) => {
  ts.test(title + 'example', (t) => {
    const tr = fromScale({ x: 4, y: 2 }, 2)
    const p = nudged.point.transform({ x: 2, y: 1 }, tr)
    t.deepEqual(p, {
      x: 0,
      y: 0
    })

    t.end()
  })

  ts.test(title + 'zero scale', (t) => {
    const center = { x: 4, y: 2 }
    t.transformsEqual(fromScale(center, 0), {
      a: 0,
      b: 0,
      x: 4,
      y: 2
    })

    t.end()
  })
}

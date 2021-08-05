const title = 'transform.fromRotation: '
const nudged = require('../../index')
const fromRotation = nudged.transform.fromRotation // unit

module.exports = (ts) => {
  ts.test(title + 'basic', (t) => {
    const tr = fromRotation({ x: 4, y: 2 }, Math.PI)
    const p = nudged.point.transform({ x: 2, y: 1 }, tr)
    t.deepEqual(p, {
      x: 6,
      y: 3
    })

    t.end()
  })

  ts.test(title + 'over-rotation', (t) => {
    const center = { x: 4, y: 2 }
    t.transformsEqual(fromRotation(center, Math.PI * 8), {
      a: 1,
      b: 0,
      x: 0,
      y: 0
    }, 'over-rotation is okay')

    t.end()
  })
}

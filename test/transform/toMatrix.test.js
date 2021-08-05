const title = 'transform.toMatrix: '
const nudged = require('../../index')
const toMatrix = nudged.transform.toMatrix

module.exports = (ts) => {
  ts.test(title + 'correct properties', (t) => {
    const tr = { a: 1, b: 2, x: 3, y: 4 }

    t.deepEqual(toMatrix(tr), {
      a: 1,
      b: 2,
      c: -2,
      d: 1,
      e: 3,
      f: 4
    })

    t.end()
  })
}

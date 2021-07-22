const title = 'transform.fromArray: '
const nudged = require('../../index')
const fromArray = nudged.transform.fromArray

module.exports = (ts) => {
  ts.test(title + 'happy', (t) => {
    t.deepEqual(fromArray([1, 2, 3, 4]), {
      a: 1,
      b: 2,
      x: 3,
      y: 4
    })

    t.end()
  })
}

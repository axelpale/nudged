const title = 'transform.toArray: '
const transform = require('../../index').transform
const toArray = transform.toArray

module.exports = (ts) => {
  ts.test(title + 'basic transforms to array', (t) => {
    t.deepEqual(toArray(transform.ROT180), [-1, 0, 0, 0])
    t.deepEqual(toArray({ a: 1, b: 2, x: 3, y: 4 }), [1, 2, 3, 4])

    t.end()
  })
}

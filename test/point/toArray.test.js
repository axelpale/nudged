const nudged = require('../../index')
const toArray = nudged.point.toArray
const title = 'point.toArray: '

module.exports = (ts) => {
  ts.test(title + 'happy', (t) => {
    t.deepEqual(toArray({ x: 1, y: 2 }), [1, 2], 'basic conversion')

    t.end()
  })
}

const nudged = require('../../index')
const fromArray = nudged.point.fromArray
const title = 'point.fromArray: '

module.exports = (ts) => {
  ts.test(title + 'happy', (t) => {
    t.deepEqual(fromArray([1, 2]), {
      x: 1,
      y: 2
    })

    t.end()
  })

  ts.test(title + 'invalid array', (t) => {
    t.throws(() => {
      fromArray([1])
    }, 'too short array')

    t.throws(() => {
      fromArray([1, 2, 3])
    }, 'too long array')

    t.end()
  })
}

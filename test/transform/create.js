const nudged = require('../../index')
const unit = nudged.transform

module.exports = (ts) => {
  ts.test('happy', (t) => {
    t.deepEqual(unit.create(1, 2, 3, 4), {
      a: 1,
      b: 2,
      x: 3,
      y: 4
    }, 'create transform object')

    t.end()
  })

  ts.test('detect invalid arguments', (t) => {
    t.throws(() => {
      unit.create()
    }, Error)

    t.throws(() => {
      unit.create('1', '2', '3', '4')
    }, Error)

    t.end()
  })
}

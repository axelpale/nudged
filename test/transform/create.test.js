const title = 'transform.create: '
const nudged = require('../../index')
const unit = nudged.transform

module.exports = (ts) => {
  ts.test(title + 'happy', (t) => {
    t.deepEqual(unit.create(1, 2, 3, 4), {
      a: 1,
      b: 2,
      x: 3,
      y: 4
    }, 'create transform object')

    t.end()
  })
}

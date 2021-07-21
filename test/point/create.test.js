const nudged = require('../../index')
const point = nudged.point

module.exports = (ts) => {
  ts.test('case: create point', (t) => {
    t.deepEqual(point.create(-1, 2), {
      x: -1,
      y: 2
    })

    t.end()
  })
}

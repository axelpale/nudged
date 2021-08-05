const title = 'point.create: '
const nudged = require('../../index')
const point = nudged.point

module.exports = (ts) => {
  ts.test(title + 'create a point', (t) => {
    t.deepEqual(point.create(-1, 2), {
      x: -1,
      y: 2
    })

    t.end()
  })
}

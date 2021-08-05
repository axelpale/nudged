const title = 'point.distance: '
const nudged = require('../../index')
const distance = nudged.point.distance

module.exports = (ts) => {
  ts.test(title + 'basic distances', (t) => {
    t.equal(distance({ x: 1, y: 1 }, { x: 1, y: 1 }), 0, 'same point')
    t.equal(distance({ x: 0, y: 0 }, { x: 3, y: 4 }), 5, 'common triangle')

    t.end()
  })
}

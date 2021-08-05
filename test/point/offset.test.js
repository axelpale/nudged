const nudged = require('../../index')
const offset = nudged.point.offset
const title = 'point.offset: '

module.exports = (ts) => {
  ts.test(title + 'happy', (t) => {
    t.deepEqual(
      offset({ x: 1, y: 2 }, 1, 1),
      { x: 2, y: 3 },
      'offset by (1,1)'
    )

    t.end()
  })
}

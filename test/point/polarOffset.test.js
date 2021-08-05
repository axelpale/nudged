const nudged = require('../../index')
const polarOffset = nudged.point.polarOffset
const title = 'point.polarOffset: '

module.exports = (ts) => {
  ts.test(title + 'happy', (t) => {
    t.deepEqual(
      polarOffset({ x: 1, y: 2 }, 2, 0),
      { x: 3, y: 2 },
      'polar offset by 2 towards x'
    )

    t.pointsAlmostEqual(
      polarOffset({ x: 1, y: 2 }, 2, Math.PI),
      { x: -1, y: 2 },
      'polar offset by 2 towards -x'
    )

    t.end()
  })
}

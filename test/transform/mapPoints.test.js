const transform = require('../../index').transform
const mapPoint = transform.mapPoint
const mapPoints = transform.mapPoints

module.exports = (ts) => {
  ts.test('case: map single point', (t) => {
    t.deepEqual(
      mapPoint(transform.X2, { x: 1, y: 2 }),
      { x: 2, y: 4 },
      'scale one'
    )

    t.deepEqual(
      mapPoint({ a: 1, b: 0, x: 5, y: 5 }, { x: 1, y: 2 }),
      { x: 6, y: 7 },
      'translate one'
    )

    t.end()
  })

  ts.test('case: map array of points', (t) => {
    t.deepEqual(
      mapPoints(transform.X2, [{ x: 1, y: 2 }, { x: -1, y: -2 }]),
      [{ x: 2, y: 4 }, { x: -2, y: -4 }],
      'scale one'
    )

    t.end()
  })

  ts.test('case: try map single point with mapPoints', (t) => {
    t.throws(() => {
      mapPoints(transform.X2, { x: 1, y: 2 })
    }, TypeError, 'detect missing array')

    t.end()
  })
}

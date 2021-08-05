const title = 'point.transformMany: '
const nudged = require('../../index')
const transform = nudged.transform
const point = nudged.point

module.exports = (ts) => {
  ts.test(title + 'transform array of points', (t) => {
    const ps = [{ x: 1, y: 2 }, { x: -1, y: -2 }]
    t.deepEqual(
      point.transformMany(ps, transform.X2),
      [{ x: 2, y: 4 }, { x: -2, y: -4 }],
      'scale many by x2'
    )

    t.end()
  })

  ts.test(title + 'try transform single point with mapPoints', (t) => {
    t.throws(() => {
      point.transformMany({ x: 1, y: 2 }, transform.X2)
    }, TypeError, 'detect missing array')

    t.end()
  })
}

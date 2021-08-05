const title = 'point.transform: '
const nudged = require('../../index')
const transform = nudged.transform
const point = nudged.point // unit

module.exports = (ts) => {
  ts.test(title + 'transform single point', (t) => {
    t.deepEqual(
      point.transform({ x: 1, y: 2 }, transform.X2),
      { x: 2, y: 4 },
      'scale x2'
    )

    t.deepEqual(
      point.transform({ x: 1, y: 2 }, { a: 1, b: 0, x: 5, y: 5 }),
      { x: 6, y: 7 },
      'translate by 5,5'
    )

    t.end()
  })
}

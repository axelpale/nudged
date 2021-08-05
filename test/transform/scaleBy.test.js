const title = 'transform.scaleBy: '
const transform = require('../../index').transform
const scaleBy = transform.scaleBy
const IDENTITY = transform.IDENTITY
const HALF = transform.HALF
const X2 = transform.X2

module.exports = (ts) => {
  ts.test(title + 'basic scalings', (t) => {
    const c1 = { x: 0, y: 0 }
    t.transformsEqual(scaleBy(IDENTITY, c1, 2), X2)
    t.transformsEqual(scaleBy(IDENTITY, c1, 0.5), HALF)

    const c2 = { x: 100, y: 100 }
    t.transformsEqual(
      scaleBy({ a: 1, b: 0, x: 0, y: 0 }, c2, 0.5),
      { a: 0.5, b: 0, x: 50, y: 50 },
      'identical translation and scale center'
    )

    const c3 = { x: 100, y: 100 }
    t.transformsEqual(
      scaleBy({ a: 1, b: 0, x: 100, y: 100 }, c3, 0.5),
      { a: 0.5, b: 0, x: 100, y: 100 },
      'identical translation and scale center'
    )

    t.end()
  })

  ts.test(title + 'prevent negative scale', (t) => {
    t.throws(() => {
      scaleBy(IDENTITY, { x: 0, y: 0 }, 0)
    }, Error, 'detect zero')

    t.throws(() => {
      scaleBy(IDENTITY, { x: 0, y: 0 }, -1)
    }, Error, 'detect negative')

    t.end()
  })
}

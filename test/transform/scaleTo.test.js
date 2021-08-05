const title = 'transform.scaleTo: '
const transform = require('../../index').transform
const scaleTo = transform.scaleTo
const IDENTITY = transform.IDENTITY
const HALF = transform.HALF
const X2 = transform.X2

module.exports = (ts) => {
  ts.test(title + 'basic scalings', (t) => {
    const c1 = { x: 0, y: 0 }
    t.transformsEqual(scaleTo(X2, c1, 2), X2)
    t.transformsEqual(scaleTo(X2, c1, 1), IDENTITY)
    t.transformsEqual(scaleTo(X2, c1, 0.5), HALF)

    const t2 = { a: 2, b: 0, x: 50, y: 50 }
    const c2 = { x: 100, y: 100 }
    t.transformsEqual(
      scaleTo(t2, c2, 0.5),
      { a: 0.5, b: 0, x: 87.5, y: 87.5 },
      'sclae one-fourth towards 100,100'
    )

    t.end()
  })
}

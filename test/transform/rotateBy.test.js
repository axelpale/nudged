const title = 'transform.rotateBy: '
const transform = require('../../index').transform
const rotateBy = transform.rotateBy
const IDENTITY = transform.IDENTITY
const ROT180 = transform.ROT180

module.exports = (ts) => {
  ts.test(title + 'basic rotations', (t) => {
    const c1 = { x: 0, y: 0 }
    t.transformsEqual(rotateBy(ROT180, c1, Math.PI), IDENTITY)
    t.transformsEqual(rotateBy(IDENTITY, c1, 0), IDENTITY)

    const c2 = { x: 100, y: 100 }
    t.transformsEqual(
      rotateBy({ a: 1, b: 0, x: 0, y: 0 }, c2, Math.PI),
      { a: -1, b: 0, x: 200, y: 200 },
      'around non-trivial center'
    )

    t.end()
  })
}

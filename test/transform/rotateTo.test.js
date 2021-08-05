const title = 'transform.rotateTo: '
const transform = require('../../index').transform
const rotateTo = transform.rotateTo
const IDENTITY = transform.IDENTITY
const ROT180 = transform.ROT180

module.exports = (ts) => {
  ts.test(title + 'basic rotations', (t) => {
    const c1 = { x: 0, y: 0 }
    t.transformsEqual(rotateTo(ROT180, c1, Math.PI), ROT180)
    t.transformsEqual(rotateTo(IDENTITY, c1, Math.PI), ROT180)

    const tr = transform.fromPolar({ x: 0, y: 0 }, 2, Math.PI / 2)
    const c2 = { x: 100, y: 100 }
    t.transformsEqual(
      rotateTo(tr, c2, Math.PI),
      { a: -2, b: 0, x: 200, y: 0 },
      'around non-trivial center'
    )

    t.end()
  })
}

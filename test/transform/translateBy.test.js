const title = 'transform.translateBy: '
const transform = require('../../index').transform
const translateBy = transform.translateBy

const IDENTITY = transform.IDENTITY
const ROT90 = transform.ROT90

module.exports = (ts) => {
  ts.test(title + 'basic translations', (t) => {
    t.transformsEqual(
      translateBy(IDENTITY, { x: 10, y: 10 }),
      { a: 1, b: 0, x: 10, y: 10 }
    )

    t.transformsEqual(
      translateBy(ROT90, { x: 10, y: 10 }),
      { a: 0, b: 1, x: 10, y: 10 }
    )

    t.end()
  })
}

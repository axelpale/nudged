const transform = require('../../index').transform
const translateTo = transform.translateTo

const IDENTITY = transform.IDENTITY

module.exports = (ts) => {
  ts.test('case: basic translations', (t) => {
    t.transformEqual(
      translateTo(IDENTITY, { x: 10, y: 10 }),
      { a: 1, b: 0, x: 10, y: 10 }
    )

    t.transformEqual(
      translateTo({ a: 0, b: 1, x: 20, y: 30 }, { x: 10, y: 10 }),
      { a: 0, b: 1, x: 10, y: 10 }
    )

    t.end()
  })
}

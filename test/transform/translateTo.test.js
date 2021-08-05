const title = 'transform.translateTo: '
const transform = require('../../index').transform
const translateTo = transform.translateTo

const IDENTITY = transform.IDENTITY

module.exports = (ts) => {
  ts.test(title + 'basic translations', (t) => {
    t.transformsEqual(
      translateTo(IDENTITY, { x: 10, y: 10 }),
      { a: 1, b: 0, x: 10, y: 10 }
    )

    t.transformsEqual(
      translateTo({ a: 0, b: 1, x: 20, y: 30 }, { x: 10, y: 10 }),
      { a: 0, b: 1, x: 10, y: 10 }
    )

    t.end()
  })
}

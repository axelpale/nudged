const transform = require('../../index').transform
const multiply = transform.multiply
const IDENTITY = transform.IDENTITY
const ROT90 = transform.ROT90
const ROT180 = transform.ROT180
const X2 = transform.X2
const HALF = transform.HALF

module.exports = (ts) => {
  ts.test('case: basic matrix products', (t) => {
    t.transformEqual(multiply(ROT180, ROT180), IDENTITY)
    t.transformEqual(multiply(ROT90, ROT90), ROT180)
    t.transformEqual(multiply(X2, HALF), IDENTITY)

    t.end()
  })
}

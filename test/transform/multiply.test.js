const title = 'transform.multiply: '
const transform = require('../../index').transform
const multiply = transform.multiply
const IDENTITY = transform.IDENTITY
const ROT90 = transform.ROT90
const ROT180 = transform.ROT180
const X2 = transform.X2
const HALF = transform.HALF

module.exports = (ts) => {
  ts.test(title + 'basic matrix products', (t) => {
    t.transformsEqual(multiply(ROT180, ROT180), IDENTITY)
    t.transformsEqual(multiply(ROT90, ROT90), ROT180)
    t.transformsEqual(multiply(X2, HALF), IDENTITY)

    t.end()
  })
}

const nudged = require('../../index')
const inverse = nudged.transform.inverse
const transform = nudged.transform

module.exports = (ts) => {
  ts.test('case: various inversions', (t) => {
    const inv180 = inverse(transform.ROT180)
    t.transformEqual(inv180, transform.ROT180)

    const x2 = inverse(transform.HALF)
    t.transformEqual(x2, transform.X2)

    t.end()
  })

  ts.test('case: double inversions', (t) => {
    const inv45 = inverse(transform.ROT45)
    t.transformEqual(inverse(inv45), transform.ROT45)

    const inv90 = inverse(transform.ROT90)
    t.transformEqual(inverse(inv90), transform.ROT90)

    t.end()
  })

  ts.test('case: detect singular matrix', (t) => {
    t.throws(() => {
      inverse({ a: 0, b: 0, x: 0, y: 0 })
    }, Error)

    t.end()
  })
}

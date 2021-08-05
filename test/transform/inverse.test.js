const title = 'transform.inverse: '
const nudged = require('../../index')
const inverse = nudged.transform.inverse
const transform = nudged.transform

module.exports = (ts) => {
  ts.test(title + 'various inversions', (t) => {
    const inv180 = inverse(transform.ROT180)
    t.transformsEqual(inv180, transform.ROT180)

    const x2 = inverse(transform.HALF)
    t.transformsEqual(x2, transform.X2)

    t.end()
  })

  ts.test(title + 'double inversions', (t) => {
    const inv45 = inverse(transform.ROT45)
    t.transformsEqual(inverse(inv45), transform.ROT45)

    const inv90 = inverse(transform.ROT90)
    t.transformsEqual(inverse(inv90), transform.ROT90)

    t.end()
  })

  ts.test(title + 'detect singular matrix', (t) => {
    t.throws(() => {
      inverse({ a: 0, b: 0, x: 0, y: 0 })
    }, Error)

    t.end()
  })
}

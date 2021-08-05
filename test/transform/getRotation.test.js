const title = 'transform.getRotation: '
const nudged = require('../../index')
const getRotation = nudged.transform.getRotation

const multiply = nudged.transform.multiply
const ROT45 = nudged.transform.ROT45
const ROT90 = nudged.transform.ROT90
const ROT180 = nudged.transform.ROT180

module.exports = (ts) => {
  ts.test(title + 'basic rotations', (t) => {
    t.almostEqual(getRotation(ROT90), Math.PI / 2)
    t.almostEqual(getRotation(ROT45), Math.PI / 4)

    const double90 = multiply(ROT90, ROT90)
    t.almostEqual(
      getRotation(double90),
      getRotation(ROT180)
    )

    const triple90 = multiply(multiply(ROT90, ROT90), ROT90)
    t.notAlmostEqual(
      getRotation(triple90),
      getRotation(ROT180)
    )

    t.end()
  })
}

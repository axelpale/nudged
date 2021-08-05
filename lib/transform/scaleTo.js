const scaleBy = require('./scaleBy')
const TOLERANCE = require('../tolerance')

module.exports = function (tr, center, scale) {
  // Scale the transform tr so that
  // 1) its scale multiplier becomes equal with the given scale.
  // 2) its image stays fixed at the given center point
  //
  // Parameter
  //   tr
  //     a transform
  //   center
  //     a point
  //   scale
  //     a number
  //
  // Return
  //   a transform
  //

  // Original scale
  const orig = Math.sqrt(tr.a * tr.a + tr.b * tr.b)
  // Prevent divided by zero
  if (orig < TOLERANCE) {
    throw new Error('Cannot scale singular transformation')
  }
  // orig * m = scale <=> m = scale / orig
  return scaleBy(tr, center, scale / orig)
}

const rotateBy = require('./rotateBy')

module.exports = function (tr, center, radians) {
  // Rotate image of the transform to the given angle
  // so that the given center point stays fixed.
  //
  // Parameter
  //   tr
  //     a transform
  //   center
  //     a point
  //   radians
  //     a number, angle to rotate to
  //
  // Return
  //   a transform
  //

  // Find difference between current angle and the given angle
  const r = Math.atan2(tr.b, tr.a)
  return rotateBy(tr, center, radians - r)
}

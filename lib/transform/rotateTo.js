const rotateBy = require('./rotateBy')

module.exports = function (tr, center, radians) {
  // @nudged.transform.rotateTo(tr, center, radians)
  //
  // Rotate the image of the transform to the given angle
  // so that the given center point stays fixed.
  // The angle is relative to the x-axis of the domain of the transformation.
  // After the rotation, x-axis of the image and a line at the angle are equal or parallel.
  //
  // Parameter
  //   tr
  //     a transform
  //   center
  //     a point
  //   radians
  //     a number, the angle to rotate to.
  //
  // Return
  //   a transform
  //

  // Find difference between current angle and the given angle
  const r = Math.atan2(tr.b, tr.a)
  return rotateBy(tr, center, radians - r)
}

module.exports = function (tr) {
  // Get rotation of the transform in radians.
  //
  // Parameters
  //   tr
  //     a transform
  //
  // Return
  //   a number, an angle in radians
  //
  return Math.atan2(tr.b, tr.a)
}

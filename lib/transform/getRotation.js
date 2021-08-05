module.exports = function (tr) {
  // Get rotation of the transform in radians.
  // The rotation is measured from the positive x-axis towards
  // the positive y-axis.
  //
  // Parameters
  //   tr
  //     a transform
  //
  // Return
  //   a number, an angle in radians
  //
  // Example
  //   > const t = nudged.transform.ROT180
  //   > nudged.transform.getRotation(t)
  //   3.1415...
  //
  return Math.atan2(tr.b, tr.a)
}

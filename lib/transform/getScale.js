module.exports = function (tr) {
  // Get the scale multiplier of the transformation.
  //
  // Parameters
  //   tr
  //     a transform
  //
  // Return
  //   a number, the scaling factor
  //
  // Example
  //   > const t = nudged.transform.HALF
  //   > nudged.transform.getScale(t)
  //   0.5
  //
  return Math.sqrt(tr.b * tr.b + tr.a * tr.a)
}

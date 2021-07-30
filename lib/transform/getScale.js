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
  return Math.sqrt(tr.b * tr.b + tr.a * tr.a)
}

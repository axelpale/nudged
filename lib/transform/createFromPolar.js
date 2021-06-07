module.exports = function (scale, rotation, tx, ty) {
  // Create a nudged.transform object by using scale magnitude,
  // rotation angle, and translation.
  //
  // Parameters:
  //   scale
  //     number, the scaling factor
  //   rotation
  //     number, rotation in radians from positive x axis towards pos. y axis.
  //   tx
  //     translation toward pos. x
  //   ty
  //     translation toward pos. y
  //
  // Return
  //   a transform object
  //
  // Precondition
  //   scale must be positive
  //
  return {
    a: scale * Math.cos(rotation),
    b: scale * Math.sin(rotation),
    x: tx,
    y: ty
  }
}

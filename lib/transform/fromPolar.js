module.exports = function (scale, rotation, tx, ty) {
  // Create a nudged.transform object by using scale magnitude,
  // rotation angle, and translation.
  //
  // Parameters:
  //   scale
  //     a positive number. The scaling factor.
  //   rotation
  //     a number. Rotation in radians from positive x axis towards pos. y axis.
  //   tx
  //     a number. Translation toward positive x
  //   ty
  //     a number. Translation toward positive y
  //
  // Return
  //   a transform
  //
  // Example
  //   > const tr = nudged.transform.fromPolar(2, 0, 5, 10)
  //   > const p = { x: 1, y: 1 }
  //   > nudged.point.transform(p, tr)
  //   { x: 7, y: 12 }
  //
  return {
    a: scale * Math.cos(rotation),
    b: scale * Math.sin(rotation),
    x: tx,
    y: ty
  }
}

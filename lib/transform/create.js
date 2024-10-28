module.exports = function (a, b, x, y) {
  // Create a transform object.
  //
  // Parameters
  //   a
  //     number. Indices m11 & m22.
  //     The diagonal of the linear transformation
  //   b
  //     number. Indices m12 & -m21.
  //     The upper and lower triangle of the linear transformation.
  //   x
  //     number. Index m31.
  //     The translation towards x.
  //   y
  //     number. Index m32.
  //     The translation towards y
  //
  // Return
  //   a transform object
  //
  return { a, b, x, y }
}

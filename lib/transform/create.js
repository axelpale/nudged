module.exports = function (a, b, x, y) {
  // Create a transform object.
  //
  // The object represents an affine transformation matrix
  //   | a -b  x |
  //   | b  a  y |
  //   | 0  0  1 |
  //
  // Parameters
  //   a
  //     number, m11 & m22. The diagonal of the lin. transformation
  //   b
  //     number, m12 & -m21. The upper and lower triangle of the lin. transf.
  //   x
  //     number. m31, The translation towards x
  //   y
  //     number. m32, The translation towards y
  //
  // Return
  //   a transform object
  //
  return {
    a: a,
    b: b,
    x: x,
    y: y
  }
}

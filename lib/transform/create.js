module.exports = function (a, b, x, y) {
  // @nudged.transform.create(a, b, x, y)
  //
  // Create a transform object `{ a, b, x, y }`.
  //
  // Parameters
  //   a
  //     a number. Corresponds to the indices m11 and m22,
  //     ..the diagonal of the 2x2 linear transformation matrix.
  //   b
  //     a number. Corresponds to the indices m12 & -m21,
  //     ..the upper and lower triangles of the linear transformation matrix.
  //   x
  //     a number. Corresponds to the index m31,
  //     ..the translation towards x.
  //   y
  //     a number. Corresponds to the index m32,
  //     ..the translation towards y
  //
  // Return
  //   a transform object
  //
  return { a, b, x, y }
}

const TOLERANCE = require('../tolerance')

module.exports = function (tr) {
  // Compute inversed transform. In other words, find transform X
  // so that TX = XT = I, where T is the given transform.
  //
  // Parameters
  //   tr
  //     a transform to be inverted
  //
  // Throws
  //   if the given transformation is singular and cannot be inverted.
  //   This can occur for example in situations
  //   where the scale of the transform has dropped to zero.
  //
  // Return
  //   a transform
  //

  // Detect singularity from the determinant
  // See note 2015-10-26-16-30
  const det = tr.a * tr.a + tr.b * tr.b
  // Test if singular transformation. These might occur when all the range
  // points are the same, forcing the scale to drop to zero.
  if (Math.abs(det) < TOLERANCE) {
    throw new Error('Singular transformations cannot be inversed.')
  }
  const ahat = tr.a / det
  const bhat = -tr.b / det
  const xhat = (-tr.a * tr.x - tr.b * tr.y) / det
  const yhat = (tr.b * tr.x - tr.a * tr.y) / det

  return {
    a: ahat,
    b: bhat,
    x: xhat,
    y: yhat
  }
}

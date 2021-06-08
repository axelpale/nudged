const transform = require('../transform')

module.exports = function (domain, range) {
  // Estimate a non-reflective similarity transformation.
  // In other words, an affine transformation where translation,
  // positive scaling, and rotation are allowed.
  //
  // Parameters
  //   domain
  //     array of points
  //   range
  //     array of points
  //
  // Return
  //   a transform
  //

  // Allow arrays of different length but
  // ignore the extra points.
  const N = Math.min(domain.length, range.length)

  // If length is zero, no estimation can be done. We choose the indentity
  // transformation be the best quess.
  if (N === 0) {
    return transform.IDENTITY
  } // else

  let a1 = 0
  let b1 = 0
  let c1 = 0
  let d1 = 0
  let a2 = 0
  let b2 = 0
  let ad = 0
  let bc = 0
  let ac = 0
  let bd = 0

  let i, a, b, c, d
  for (i = 0; i < N; i += 1) {
    a = domain[i].x
    b = domain[i].y
    c = range[i].x
    d = range[i].y
    a1 += a
    b1 += b
    c1 += c
    d1 += d
    a2 += a * a
    b2 += b * b
    ad += a * d
    bc += b * c
    ac += a * c
    bd += b * d
  }

  // Denominator i.e. determinant
  // It is zero iff domain[i] = domain[j] for every i and j in [0, n).
  // In other words, iff all the domain points are the same or there is only one domain point.
  const det = N * a2 + N * b2 - a1 * a1 - b1 * b1

  if (Math.abs(det) < transform.EPSILON) {
    // The domain points are the same.
    // We guess the translation to the mean of the range to be the best guess.
    // Because the points are the same, we can use a, b to
    // represent the mean of domain points.
    return {
      a: 1,
      b: 0,
      x: (c1 / N) - a,
      y: (d1 / N) - b
    }
  }

  // Estimates
  const ahat = (N * (ac + bd) - a1 * c1 - b1 * d1) / det
  const bhat = (N * (ad - bc) + b1 * c1 - a1 * d1) / det
  const xhat = (-a1 * (ac + bd) + b1 * (ad - bc) + a2 * c1 + b2 * c1) / det
  const yhat = (-b1 * (ac + bd) - a1 * (ad - bc) + a2 * d1 + b2 * d1) / det

  return {
    a: ahat,
    b: bhat,
    x: xhat,
    y: yhat
  }
}

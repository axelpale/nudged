const TOLERANCE = require('../tolerance')

module.exports = function (domain, range) {
  // Estimate translation with scaling.
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

  // If length is zero, no points provided, thus no estimation can be done.
  // We choose the identity transformation be the best quess.
  if (N === 0) {
    return { a: 1, b: 0, x: 0, y: 0 }
  }

  // If length is one, only single point pair was provided.
  // A translation is the optimal solution.
  // The general algorithm resolves single point pair to a translation,
  // but translation estimation is numerically much more stable and thus
  // worth a few lines of code. See PR#31.
  if (N === 1) {
    const dx = range[0].x - domain[0].x
    const dy = range[0].y - domain[0].y
    return { a: 1, b: 0, x: dx, y: dy }
  }

  let a1 = 0
  let b1 = 0
  let c1 = 0
  let d1 = 0
  let a2 = 0
  let b2 = 0
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
    ac += a * c
    bd += b * d
  }

  // Denominator = determinant
  const N2 = N * N
  const a12 = a1 * a1
  const b12 = b1 * b1
  // For numerical stability near the zero determinant, reorder terms so
  // that we evaluate x and y specific terms separately. See PR#31.
  //   p = a2 + b2
  //   q = ac + bd
  // det = N2 * p - N * (a12 + b12)
  //     = N2 * (a2 + b2) - N * (a12 + b12)
  //     = N2 * a2 + N2 * b2 - N * a12 - N * b12
  //     = N2 * a2 - N * a12 + N2 * b2 - N * b12
  const det = N2 * a2 - N * a12 + N2 * b2 - N * b12

  if (Math.abs(det) < TOLERANCE) {
    // N === 0 => det === 0
    if (N === 0) {
      return { a: 1, b: 0, x: 0, y: 0 }
    }
    // else
    // det === 0 <=> all the domain points are the same
    // We guess the translation to the mean of the range to be the best guess.
    // Because all the domain points are the same
    // we can use the last point (a, b) to represents
    // the mean of the domain points.
    return {
      a: 1,
      b: 0,
      x: (c1 / N) - a,
      y: (d1 / N) - b
    }
  }

  // Shorthand
  const p = a2 + b2
  const q = ac + bd

  // Estimators
  const ahat = (N2 * q - N * (a1 * c1 + b1 * d1)) / det
  const xhat = (-N * a1 * q + N * c1 * p - b12 * c1 + a1 * b1 * d1) / det
  const yhat = (-N * b1 * q + N * d1 * p - a12 * d1 + a1 * b1 * c1) / det

  return {
    a: ahat,
    b: 0,
    x: xhat,
    y: yhat
  }
}

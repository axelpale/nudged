const TOLERANCE = require('../tolerance')

module.exports = function (domain, range) {
  // Estimate translation with rotation.
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

  let asum = 0 // sum
  let bsum = 0
  let csum = 0
  let dsum = 0
  let ac = 0 // product sum
  let ad = 0
  let bc = 0
  let bd = 0

  let i, a, b, c, d
  for (i = 0; i < N; i += 1) {
    a = domain[i].x
    b = domain[i].y
    c = range[i].x
    d = range[i].y
    asum += a
    bsum += b
    csum += c
    dsum += d
    ac += a * c
    ad += a * d
    bc += b * c
    bd += b * d
  }

  // Denominator = determinant.
  const v = N * (ac + bd) - asum * csum - bsum * dsum
  const w = N * (ad - bc) - asum * dsum + bsum * csum
  const det = Math.sqrt(v * v + w * w)

  if (det < TOLERANCE) {
    // N === 0 => det === 0
    if (N === 0) {
      return { a: 1, b: 0, x: 0, y: 0 }
    } // else
    // det === 0 <=> undecidable
    // We guess the translation to the mean of the range to be the best guess.
    // Here a, b represents the mean of domain points.
    return {
      a: 1,
      b: 0,
      x: (csum - asum) / N,
      y: (dsum - bsum) / N
    }
  }

  // Estimators
  const ahat = v / det
  const bhat = w / det
  const xhat = (-asum * ahat + bsum * bhat + csum) / N
  const yhat = (-asum * bhat - bsum * ahat + dsum) / N

  return {
    a: ahat,
    b: bhat,
    x: xhat,
    y: yhat
  }
}

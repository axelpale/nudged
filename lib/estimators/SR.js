const TOLERANCE = require('../tolerance')

module.exports = function (domain, range, center) {
  // Estimate optimal transformation given the domain and the range
  // so that the center point remains fixed.
  // Example use cases:
  // 1) Transform an image that has one corner fixed with a pin.
  // 2) Allow only scale and rotation by fixing the middle of the object.
  //
  // Parameters
  //   domain
  //     array of points
  //   range
  //     array of points
  //   center
  //     a point that must remain constant in the tranformation.
  //
  // Return
  //   a transform
  //

  // Allow arrays of different length but
  // ignore the extra points.
  const N = Math.min(domain.length, range.length)

  const cx = center.x
  const cy = center.y

  let a2 = 0
  let b2 = 0
  let ac = 0
  let bd = 0
  let bc = 0
  let ad = 0

  let i, a, b, c, d
  for (i = 0; i < N; i += 1) {
    a = domain[i].x - cx
    b = domain[i].y - cy
    c = range[i].x - cx
    d = range[i].y - cy
    a2 += a * a
    b2 += b * b
    ac += a * c
    bd += b * d
    bc += b * c
    ad += a * d
  }

  // Denominator = determinant.
  // It becomes zero iff N = 0 or domain[i] = [cx, cy] for every i in [0, n).
  // In other words, iff all the domain points are under the center or
  // there is no domain points.
  const det = a2 + b2

  if (Math.abs(det) < TOLERANCE) {
    // The domain points are under the pivot or there is no domain points.
    // We assume identity transform be the simplest guess. It keeps
    // the domain points under the pivot if there is some.
    return { a: 1, b: 0, x: 0, y: 0 }
  }

  // Estimators
  const ahat = (ac + bd) / det
  const bhat = (-bc + ad) / det
  const xhat = cy * bhat - cx * ahat + cx
  const yhat = -cx * bhat - cy * ahat + cy

  return {
    a: ahat,
    b: bhat,
    x: xhat,
    y: yhat
  }
}

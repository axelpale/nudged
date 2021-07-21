const transform = require('../transform')

module.exports = function (domain, range, center) {
  // Estimate a scaling around the given center.
  // In other words, estimate a homothety.
  //
  // Parameters
  //   domain
  //     array of points
  //   range
  //     array of points
  //   center
  //     a point, the center of scaling
  //
  // Return
  //   a transform
  //
  const N = Math.min(domain.length, range.length)

  let ac = 0
  let bd = 0
  let aa = 0
  let bb = 0

  const cx = center.x
  const cy = center.y

  let i, a, b, c, d
  for (i = 0; i < N; i += 1) {
    a = domain[i].x - cx
    b = domain[i].y - cy
    c = range[i].x - cx
    d = range[i].y - cy
    ac += a * c
    bd += b * d
    aa += a * a
    bb += b * b
  }

  const det = aa + bb

  if (Math.abs(det) < transform.EPSILON) {
    // All domain points equal the pivot.
    // Identity transform is then only solution.
    // det === 0 also if N === 0.
    // Assume identity transform to be the best guess
    return transform.IDENTITY
  }

  // Prevent negative scaling because it would be same as positive scaling
  // and rotation => limit to zero
  const ahat = Math.max(0, (ac + bd) / det)
  const xhat = (1 - ahat) * cx
  const yhat = (1 - ahat) * cy

  return {
    a: ahat,
    b: 0,
    x: xhat,
    y: yhat
  }
}

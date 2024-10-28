const TOLERANCE = require('../tolerance')

module.exports = function (domain, range, center) {
  // Estimate rotation around a fixed center point
  //
  // Parameters
  //   domain
  //     array of points
  //   range
  //     array of points
  //   center
  //     point, a fixed center to rotate around
  //
  // Return
  //   a transform
  //
  const N = Math.min(domain.length, range.length)

  let ac = 0
  let ad = 0
  let bc = 0
  let bd = 0

  const cx = center.x
  const cy = center.y

  let i, a, b, c, d
  for (i = 0; i < N; i += 1) {
    a = domain[i].x - cx
    b = domain[i].y - cy
    c = range[i].x - cx
    d = range[i].y - cy
    ac += a * c
    ad += a * d
    bc += b * c
    bd += b * d
  }

  const p = ac + bd
  const q = ad - bc

  // Determinant. Always det >= 0
  const det = p * p + q * q

  if (det < TOLERANCE) {
    // det === 0
    // <=> q === 0 and p === 0.
    // <=> ad === bc and ac === -bd
    // <=> domain in pivot OR range in pivot OR yet unknown cases
    //     where the angle cannot be determined.
    // det === 0 also if N === 0.
    // Assume identity transform to be the best guess
    return { a: 1, b: 0, x: 0, y: 0 }
  }

  // Denominator.
  const den = Math.sqrt(det)

  const ahat = p / den
  const bhat = q / den
  const xhat = cx - cx * ahat + cy * bhat
  const yhat = cy - cx * bhat - cy * ahat

  return {
    a: ahat,
    b: bhat,
    x: xhat,
    y: yhat
  }
}

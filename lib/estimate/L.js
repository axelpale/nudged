const transform = require('../transform')

module.exports = function (angle, domain, range) {
  // Estimate translation along the given angle
  //
  // Parameters:
  //   angle
  //     number, radians
  //   domain
  //     array of points
  //   range
  //     array of points
  //
  // Return
  //   a transform
  //
  const N = Math.min(domain.length, range.length)

  let a = 0
  let b = 0
  let c = 0
  let d = 0

  const co = Math.cos(angle)
  const si = Math.sin(angle)

  if (N < 1) {
    // No point pairs. Assume identity transform to be the best guess.
    return transform.IDENTITY
  }

  for (let i = 0; i < N; i += 1) {
    a += domain[i].x
    b += domain[i].y
    c += range[i].x
    d += range[i].y
  }

  const t = (co * (c - a) + si * (d - b)) / N
  const tx = t * co
  const ty = t * si

  return {
    a: 1,
    b: 0,
    x: tx,
    y: ty
  }
}

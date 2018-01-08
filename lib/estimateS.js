var Transform = require('./Transform')

module.exports = function (domain, range, pivot) {
  var i, N, D, a0, b0, a, b, c, d, ac, bd, aa, bb, shat, tx, ty

  N = Math.min(domain.length, range.length)
  ac = bd = aa = bb = 0

  if (typeof pivot === 'undefined') {
    a0 = b0 = 0
  } else {
    a0 = pivot[0]
    b0 = pivot[1]
  }

  for (i = 0; i < N; i += 1) {
    a = domain[i][0] - a0
    b = domain[i][1] - b0
    c = range[i][0] - a0
    d = range[i][1] - b0
    ac += a * c
    bd += b * d
    aa += a * a
    bb += b * b
  }

  D = aa + bb

  if (D === 0) {
    // All domain points equal the pivot.
    // Identity transform is then only solution.
    // D === 0 also if N === 0.
    // Assume identity transform to be the best guess
    return Transform.IDENTITY
  }

  // Prevent negative scaling because it would be same as positive scaling
  // and rotation => limit to zero
  shat = Math.max(0, (ac + bd) / D)
  tx = (1 - shat) * a0
  ty = (1 - shat) * b0

  return new Transform(shat, 0, tx, ty)
}

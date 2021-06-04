var Transform = require('./Transform')

module.exports = function (domain, range, pivot) {
  var i, N, D, a0, b0, a, b, c, d, ac, ad, bc, bd, p, q, shat, rhat, tx, ty

  N = Math.min(domain.length, range.length)
  ac = ad = bc = bd = 0

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
    ad += a * d
    bc += b * c
    bd += b * d
  }

  p = ac + bd
  q = ad - bc

  D = Math.sqrt(p * p + q * q)

  if (D === 0) {
    // D === 0
    // <=> q === 0 and p === 0.
    // <=> ad === bc and ac === -bd
    // <=> domain in pivot OR range in pivot OR yet unknown cases
    //     where the angle cannot be determined.
    // D === 0 also if N === 0.
    // Assume identity transform to be the best guess
    return Transform.IDENTITY
  }

  shat = p / D
  rhat = q / D
  tx = a0 - a0 * shat + b0 * rhat
  ty = b0 - a0 * rhat - b0 * shat

  return new Transform(shat, rhat, tx, ty)
}

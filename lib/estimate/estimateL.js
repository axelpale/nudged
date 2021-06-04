var Transform = require('./Transform')

module.exports = function (domain, range, angle) {
  var N, a, b, c, d, co, si, i, t, tx, ty

  N = Math.min(domain.length, range.length)
  a = b = c = d = 0

  co = Math.cos(angle)
  si = Math.sin(angle)

  if (N < 1) {
    // No point pairs. Assume identity transform to be the best guess.
    return Transform.IDENTITY
  }

  for (i = 0; i < N; i += 1) {
    a += domain[i][0]
    b += domain[i][1]
    c += range[i][0]
    d += range[i][1]
  }

  t = (co * (c - a) + si * (d - b)) / N
  tx = t * co
  ty = t * si

  return new Transform(1, 0, tx, ty)
}

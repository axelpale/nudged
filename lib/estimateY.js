var Transform = require('./Transform')

module.exports = function (domain, range, angle) {
  var N, b, d, i, ty

  N = Math.min(domain.length, range.length)
  b = d = 0

  if (N < 1) {
    // No point pairs. Assume identity transform to be the best guess.
    return Transform.IDENTITY
  }

  for (i = 0; i < N; i += 1) {
    b += domain[i][1]
    d += range[i][1]
  }

  ty = (d - b) / N

  return new Transform(1, 0, 0, ty)
}

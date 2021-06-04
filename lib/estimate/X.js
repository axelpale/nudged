var Transform = require('./Transform')

module.exports = function (domain, range, angle) {
  var N, a, c, i, tx

  N = Math.min(domain.length, range.length)
  a = c = 0

  if (N < 1) {
    // No point pairs. Assume identity transform to be the best guess.
    return Transform.IDENTITY
  }

  for (i = 0; i < N; i += 1) {
    a += domain[i][0]
    c += range[i][0]
  }

  tx = (c - a) / N

  return new Transform(1, 0, tx, 0)
}

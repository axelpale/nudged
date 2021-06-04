var Transform = require('./Transform')

module.exports = function (domain, range) {
  var i, N, a1, b1, c1, d1, txhat, tyhat

  N = Math.min(domain.length, range.length)
  a1 = b1 = c1 = d1 = 0

  if (N < 1) {
    // Assume identity transform be the best guess
    return Transform.IDENTITY
  }

  for (i = 0; i < N; i += 1) {
    a1 += domain[i][0]
    b1 += domain[i][1]
    c1 += range[i][0]
    d1 += range[i][1]
  }

  txhat = (c1 - a1) / N
  tyhat = (d1 - b1) / N

  return new Transform(1, 0, txhat, tyhat)
}

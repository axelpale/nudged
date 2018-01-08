var Transform = require('./Transform')

module.exports = function (domain, range) {
  // Parameters
  //   domain
  //     array of [x, y] 2D arrays
  //   range
  //     array of [x, y] 2D arrays

  // Alias
  var X = domain
  var Y = range

  // Allow arrays of different length but
  // ignore the extra points.
  var N = Math.min(X.length, Y.length)

  var i, a, b, c, d, a1, b1, c1, d1, a2, b2, ac, bd
  a1 = b1 = c1 = d1 = a2 = b2 = ac = bd = 0
  for (i = 0; i < N; i += 1) {
    a = X[i][0]
    b = X[i][1]
    c = Y[i][0]
    d = Y[i][1]
    a1 += a
    b1 += b
    c1 += c
    d1 += d
    a2 += a * a
    b2 += b * b
    ac += a * c
    bd += b * d
  }

  // Denominator.
  var N2 = N * N
  var a12 = a1 * a1
  var b12 = b1 * b1
  var p = a2 + b2
  var q = ac + bd
  var D = N2 * p - N * (a12 + b12)

  if (D === 0) {
    // N === 0 => D === 0
    if (N === 0) {
      return new Transform(1, 0, 0, 0)
    } // else
    // D === 0 <=> all the domain points are the same
    // We guess the translation to the mean of the range to be the best guess.
    // Here a, b represents the mean of domain points.
    return new Transform(1, 0, (c1 / N) - a, (d1 / N) - b)
  }

  // Estimators
  var shat = (N2 * q - N * (a1 * c1 + b1 * d1)) / D
  var txhat = (-N * a1 * q + N * c1 * p - b12 * c1 + a1 * b1 * d1) / D
  var tyhat = (-N * b1 * q + N * d1 * p - a12 * d1 + a1 * b1 * c1) / D

  return new Transform(shat, 0, txhat, tyhat)
}

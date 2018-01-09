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

  var i, a, b, c, d, a1, b1, c1, d1, ac, ad, bc, bd
  a1 = b1 = c1 = d1 = ac = ad = bc = bd = 0
  for (i = 0; i < N; i += 1) {
    a = X[i][0]
    b = X[i][1]
    c = Y[i][0]
    d = Y[i][1]
    a1 += a
    b1 += b
    c1 += c
    d1 += d
    ac += a * c
    ad += a * d
    bc += b * c
    bd += b * d
  }

  // Denominator.
  var v = N * (ad - bc) - a1 * d1 + b1 * c1
  var w = N * (ac + bd) - a1 * c1 - b1 * d1
  var D = Math.sqrt(v * v + w * w)

  if (D === 0) {
    // N === 0 => D === 0
    if (N === 0) {
      return new Transform(1, 0, 0, 0)
    } // else
    // D === 0 <=> undecidable
    // We guess the translation to the mean of the range to be the best guess.
    // Here a, b represents the mean of domain points.
    return new Transform(1, 0, (c1 - a1) / N, (d1 - b1) / N)
  }

  // Estimators
  var shat = w / D
  var rhat = v / D
  var txhat = (-a1 * shat + b1 * rhat + c1) / N
  var tyhat = (-a1 * rhat - b1 * shat + d1) / N

  return new Transform(shat, rhat, txhat, tyhat)
}

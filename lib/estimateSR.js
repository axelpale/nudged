var Transform = require('./Transform')

module.exports = function (domain, range, pivot) {
  // Estimate optimal transformation given the domain and the range
  // so that the pivot point remains the same.
  //
  // Use cases
  //   - transform an image that has one corner fixed with a pin.
  //   - allow only scale and rotation by fixing the middle of the object
  //     to transform.
  //
  // Parameters
  //   domain, an array of [x, y] points
  //   range, an array of [x, y] points
  //   pivot, optional
  //     the point [x, y] that must remain constant in the tranformation.
  //     Defaults to origo [0, 0]
  //
  //
  var X, Y, N, s, r, tx, ty

  // Optional pivot
  if (typeof pivot === 'undefined') {
    pivot = [0, 0]
  }

  // Alias
  X = domain
  Y = range

  // Allow arrays of different length but
  // ignore the extra points.
  N = Math.min(X.length, Y.length)

  var v = pivot[0]
  var w = pivot[1]

  var i, a, b, c, d
  var a2, b2
  a2 = b2 = 0
  var ac, bd, bc, ad
  ac = bd = bc = ad = 0

  for (i = 0; i < N; i += 1) {
    a = X[i][0] - v
    b = X[i][1] - w
    c = Y[i][0] - v
    d = Y[i][1] - w
    a2 += a * a
    b2 += b * b
    ac += a * c
    bd += b * d
    bc += b * c
    ad += a * d
  }

  // Denominator = determinant.
  // It becomes zero iff N = 0 or X[i] = [v, w] for every i in [0, n).
  // In other words, iff all the domain points are under the fixed point or
  // there is no domain points.
  var den = a2 + b2

  var eps = 0.00000001
  if (Math.abs(den) < eps) {
    // The domain points are under the pivot or there is no domain points.
    // We assume identity transform be the simplest guess. It keeps
    // the domain points under the pivot if there is some.
    return new Transform(1, 0, 0, 0)
  }

  // Estimators
  s = (ac + bd) / den
  r = (-bc + ad) / den
  tx = w * r - v * s + v
  ty = -v * r - w * s + w

  return new Transform(s, r, tx, ty)
}

// transform
// Functions for transformation matrices, and to be exact,
// affine non-reflective similarity transformation matrices.
//

// Default epsilon to use when coping with floating point arithmetics.
// JavaScript floating point numbers have 52 bits in mantissa (IEEE-754).
// That is about 16 base10 numbers. Therefore the epsilon should be
// much larger than 1 * 10^-16. Let say 1 * 10^-10 is a good one.
exports.EPSILON = 0.0000000001

exports.create = function (a, b, x, y) {
  // Create a transform object. Check that parameters valid.
  //
  if (typeof a !== 'number') {
    throw new Error('Invalid transform property a: ' + a)
  }
  if (typeof b !== 'number') {
    throw new Error('Invalid transform property b: ' + b)
  }
  if (typeof x !== 'number') {
    throw new Error('Invalid transform property x: ' + x)
  }
  if (typeof y !== 'number') {
    throw new Error('Invalid transform property y: ' + y)
  }

  return {
    a: a,
    b: b,
    x: x,
    y: y
  }
}

exports.createFromPolar = function (scale, rotation, tx, ty) {
  // Create a nudged.transform object by using scale magnitude,
  // rotation angle, and translation.
  //
  // Parameters:
  //   scale
  //     number, the scaling factor
  //   rotation
  //     number, rotation in radians from positive x axis towards pos. y axis.
  //   tx
  //     translation toward pos. x
  //   ty
  //     translation toward pos. y
  //
  // Return
  //   a transform object
  //
  return {
    a: scale * Math.cos(rotation),
    b: scale * Math.sin(rotation),
    x: tx,
    y: ty
  }
}

exports.createFromArray = function (abxy) {
  return {
    a: abxy[0],
    b: abxy[1],
    x: abxy[2],
    y: abxy[3]
  }
}

exports.almostEqual =
exports.almostEquals = function (tr, ts, epsilon) {
  // Are two transforms almost equal? Return true if a matrix norm
  // of the difference is smaller than epsilon. We use modified L1 norm
  // that values a, B, x, and y as equally important.
  //
  // Parameters:
  //   tr
  //     a transform
  //   ts
  //     a transform
  //   epsilon
  //     optional number, default to transform.EPSILON.
  //     Set to 0 for strict comparison.
  //
  // Note:
  //   We first thought to use Frobenius norm to compare
  //   against epsilon but it felt wrong
  //   because it exaggerates a and b. Proof:
  //     We know Frobenius norm for real square matrices:
  //       Norm(A) = sqrt(sum_i(sum_j(a_ij * a_ij)))
  //     For a transform it looks like:
  //       Norm(T) = sqrt(a*a + b*b + x*x + b*b + a*a + y*y + 1)
  //     Thus a and b have twice the impact.
  //
  if (typeof epsilon !== 'number') {
    epsilon = exports.EPSILON
  }

  const da = Math.abs(tr.a - ts.a)
  const db = Math.abs(tr.b - ts.b)
  const dx = Math.abs(tr.x - ts.x)
  const dy = Math.abs(tr.y - ts.y)

  // smaller-or-equal instead of smaller-than to make epsilon=0 work.
  return da + db + dx + dy <= epsilon
}

exports.equal =
exports.equals = function (tr, ts) {
  // Are transforms equal?
  //
  // Parameters:
  //   tr
  //     a transform
  //   ts
  //     a transform
  //
  return (tr.a === ts.a && tr.b === ts.b &&
    tr.x === ts.x && tr.y === ts.y)
}

exports.getMatrix = function (tr) {
  // Get the similarity transformation matrix
  // in the format common to other APIs, including:
  // - kld-affine
  // - MDN documentation in some parts
  //
  // Return
  //   object o, having properties a, b, c, d, e, f:
  //   [ a  -b   x ]   [ o.a  o.c  o.e ]
  //   [ b   a   y ] = [ o.b  o.d  o.f ]
  //   [ 0   0   1 ]   [  -    -    -  ]
  return {
    a: tr.a,
    b: tr.b,
    c: -tr.b,
    d: tr.a,
    e: tr.x,
    f: tr.y
  }
}

exports.getRotation = function (tr) {
  // in rads
  return Math.atan2(tr.b, tr.a)
}

exports.getScale = function (tr) {
  // scale multiplier
  return Math.sqrt(tr.b * tr.b + tr.a * tr.a)
}

exports.getTranslation = function (tr) {
  // Current translation as a point.
  return {
    x: tr.x,
    y: tr.y
  }
}

exports.toArray = function (tr) {
  // Return an array representation of the transformation.
  //
  // Compatible with nudged.createFromArray(...)
  return [tr.a, tr.b, tr.x, tr.y]
}

exports.toString = function (tr) {
  // Return a string of CSS transform-function data type.
  //
  // Together with nudged.createFromString(...), this method allows
  // serialization to and from strings.
  //
  // NOTE When JavaScript converts numbers to strings, the string might
  // end up using the scientific notation (e.g. 1e-12). Not all browsers
  // support scientific notation in CSS. We have experienced problems
  // with Safari and Opera. Therefore toString must prevent the scientific
  // notation here and convert to fixed number of decimal places.
  //
  // See also: https://stackoverflow.com/q/1685680/638546
  //
  const a = tr.a.toFixed(8)
  const b = tr.b.toFixed(8)
  const c = (-tr.b).toFixed(8) // Unnecessary? Maybe '-' + b? No, e.g. '--1.2'
  const x = tr.x.toFixed(8)
  const y = tr.y.toFixed(8)
  return 'matrix(' + a + ',' + b + ',' + c + ',' + a + ',' + x + ',' + y + ')'
}

exports.point = function (tr, p) {
  // Transform a point
  //
  // Parameters
  //   tr
  //     a transfrom
  //   p
  //     a xy point
  //
  // Return
  //   the tronsformed xy point
  //
  return {
    x: tr.a * p.x - tr.b * p.y + tr.x,
    y: tr.b * p.x + tr.a * p.y + tr.y
  }
}

exports.points = function (tr, ps) {
  // Transform an array of points
  //
  // Parameters
  //   tr
  //     a transform
  //   ps
  //     an array of points
  const c = []
  for (let i = 0; i < ps.length; i += 1) {
    c.push(exports.point(tr, ps[i]))
  }
}

exports.inverse = function (tr) {
  // Return inversed transform
  // See note 2015-10-26-16-30
  const det = tr.a * tr.a + tr.b * tr.b
  // Test if singular transformation. These might occur when all the range
  // points are the same, forcing the scale to drop to zero.
  if (Math.abs(det) < Transform.EPSILON) {
    throw new Error('Singular transformations cannot be inversed.')
  }
  const ahat = tr.a / det
  const bhat = -tr.b / det
  const xhat = (-tr.a * tr.x - tr.b * tr.y) / det
  const yhat = (tr.b * tr.x - tr.a * tr.y) / det

  return {
    a: ahat,
    b: bhat,
    x: xhat,
    y: yhat
  }
}

// exports.addVector = ?
// exports.translateBy =
exports.translate = function (tr, vec) {
  // Modify transformation so that its image
  // is translated by the given vector.
  // In other words it transforms points
  // further by the given vector.
  //
  // Parameters
  //   tr
  //     a transform
  //   vec
  //     a 2d vector { dx, dy }
  //
  // Return
  //   a transform
  //
  return {
    a: tr.a,
    b: tr.b,
    x: tr.x + vec.dx,
    y: tr.y + vec.dy
  }
}

// exports.translateTo = function (tr, p) {
//   // Modify transformation so that it translates (0, 0)
//   // to the given point.
//   //
//   // Parameters
//   //   tr
//   //     a transform
//   //   p
//   //     a 2d point { x, y }
//   //
//   //
//
// }

exports.scale = function (tr, center, multiplier) {
  // Scale image of the transform so that the given
  // center point stays fixed.
  //
  // Parameter
  //   tr
  //     a transform
  //   center
  //     a point
  //   multiplier
  //     a number
  //
  // Return
  //   a transform
  //
  const m = multiplier // alias
  const cx = center.x
  const cy = center.y
  return {
    a: m * tr.a,
    b: m * tr.b,
    x: m * tr.x + (1 - m) * cx,
    y: m * tr.y + (1 - m) * cy
  }
}

exports.rotate = function (tr, center, radians) {
  // Rotate image of the transform so that the given
  // center point stays fixed.
  //
  // Parameter
  //   tr
  //     a transform
  //   center
  //     a point
  //   radians
  //     a number, angle
  //
  // Return
  //   a transform
  //
  const co = Math.cos(radians)
  const si = Math.sin(radians)

  const cx = pivot[0]
  const cy = pivot[1]

  const ahat = tr.a * co - tr.b * si
  const bhat = tr.a * si + tr.b * co
  const xhat = (tr.x - cx) * co - (tr.y - cy) * si + cx
  const yhat = (tr.x - cx) * si + (tr.y - cy) * co + cy

  return {
    a: ahat,
    b: bhat,
    x: xhat,
    y: yhat
  }
}

exports.compose =
exports.multiplyRight =
exports.multiply = function (tr, ts) {
  // Multiply this transformation matrix tr from
  // the right with the given transformation matrix ts.
  // In other words, transform the image of tr by ts.
  //
  // For reading aid:
  //   a -b  x    a -b  x
  //   b  a  y *  b  a  y
  //   0  0  1    0  0  1
  //
  return {
    a: tr.a * ts.a - tr.b * ts.b,
    b: tr.a * ts.b + tr.b * ts.a,
    x: tr.a * ts.x - tr.b * ts.y + tr.x,
    y: tr.b * ts.x + tr.a * ts.y + tr.y
  }
}

exports.IDENTITY = {
  a: 1,
  b: 0,
  x: 0,
  y: 0
}

exports.ROT90 = { a: 0, b: 1, x: 0, y: 0 }
exports.ROT180 = { a: -1, b: 0, x: 0, y: 0 }
exports.ROT270 = { a: 0, b: -1, x: 0, y: 0 }
exports.X2 = { a: 2, b: 0, x: 0, y: 0 }

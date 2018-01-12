
var Transform = function (s, r, tx, ty) {
  // Public, to allow user access
  this.s = s
  this.r = r
  this.tx = tx
  this.ty = ty
}

// Default epsilon to use when coping with floating point arithmetics.
// JavaScript floating point numbers have 52 bits in mantissa (IEEE-754).
// That is about 16 base10 numbers. Therefore the epsilon should be
// much larger than 1 * 10^-16. Let say 1 * 10^-10 is a good one.
Transform.EPSILON = 0.0000000001

var proto = Transform.prototype

proto.almostEquals =
proto.almostEqual = function (t, epsilon) {
  // Are transforms almost equal? Return true if a matrix norm
  // of the difference is smaller than epsilon. We use modified L1 norm
  // that values s, r, tx, and ty as equally important.
  //
  // Parameters:
  //   t
  //     Transform
  //   epsilon
  //     optional number, default to Transform.EPSILON.
  //     Set to 0 for strict comparison.
  //
  // Note:
  //   We first thought to use Frobenius norm but it felt wrong
  //   because it exaggerates s and r. Proof:
  //     We know Frobenius norm for real square matrices:
  //       Norm(A) = sqrt(sum_i(sum_j(a_ij * a_ij)))
  //     For a transform it looks like:
  //       Norm(T) = sqrt(s*s + r*r + x*x + r*r + s*s + y*y + 1)
  //     Thus s and r have bigger impact.
  //
  if (typeof epsilon !== 'number') {
    epsilon = Transform.EPSILON
  }

  var ds = Math.abs(this.s - t.s)
  var dr = Math.abs(this.r - t.r)
  var dx = Math.abs(this.tx - t.tx)
  var dy = Math.abs(this.ty - t.ty)

  // smaller-or-equal instead of smaller-than to make epsilon=0 work.
  return ds + dr + dx + dy <= epsilon
}

proto.equal =
proto.equals = function (t) {
  // Are transforms equal?
  //
  // Parameters:
  //   t
  //     Transform
  //
  return (this.s === t.s && this.r === t.r &&
    this.tx === t.tx && this.ty === t.ty)
}

proto.getMatrix = function () {
  // Get the transformation matrix in the format common to
  // many APIs, including:
  // - kld-affine
  //
  // Return
  //   object o, having properties a, b, c, d, e, f:
  //   [ s  -r  tx ]   [ o.a  o.c  o.e ]
  //   [ r   s  ty ] = [ o.b  o.d  o.f ]
  //   [ 0   0   1 ]   [  -    -    -  ]
  return {
    a: this.s,
    b: this.r,
    c: -this.r,
    d: this.s,
    e: this.tx,
    f: this.ty
  }
}

proto.getRotation = function () {
  // in rads
  return Math.atan2(this.r, this.s)
}

proto.getScale = function () {
  // scale multiplier
  return Math.sqrt(this.r * this.r + this.s * this.s)
}

proto.getTranslation = function () {
  // Current translation as a point.
  return [this.tx, this.ty]
}

proto.toArray = function () {
  // Return an array representation of the transformation.
  //
  // Together with nudged.createFromArray(...), this method makes an easy
  // serialization and deserialization to and from JSON possible.
  return [this.s, this.r, this.tx, this.ty]
}

// Methods that return new points

proto.transform = function (p) {
  // p
  //   point [x, y] or array of points [[x1,y1], [x2, y2], ...]

  if (typeof p[0] === 'number') {
    // Single point
    return [
      this.s * p[0] - this.r * p[1] + this.tx,
      this.r * p[0] + this.s * p[1] + this.ty
    ]
  } // else

  var i
  var c = []
  for (i = 0; i < p.length; i += 1) {
    c.push([
      this.s * p[i][0] - this.r * p[i][1] + this.tx,
      this.r * p[i][0] + this.s * p[i][1] + this.ty])
  }
  return c
}

// Methods that return new Transformations

proto.inverse = function () {
  // Return inversed transform instance
  // See note 2015-10-26-16-30
  var det = this.s * this.s + this.r * this.r
  // Test if singular transformation. These might occur when all the range
  // points are the same, forcing the scale to drop to zero.
  if (Math.abs(det) < Transform.EPSILON) {
    throw new Error('Singular transformations cannot be inversed.')
  }
  var shat = this.s / det
  var rhat = -this.r / det
  var txhat = (-this.s * this.tx - this.r * this.ty) / det
  var tyhat = (this.r * this.tx - this.s * this.ty) / det

  return new Transform(shat, rhat, txhat, tyhat)
}

proto.translateBy = function (dx, dy) {
  return new Transform(this.s, this.r, this.tx + dx, this.ty + dy)
}

proto.scaleBy = function (multiplier, pivot) {
  // Parameter
  //   multiplier
  //   pivot
  //     optional, a [x, y] point
  var m, x, y
  m = multiplier // alias
  if (typeof pivot === 'undefined') {
    x = y = 0
  } else {
    x = pivot[0]
    y = pivot[1]
  }
  return new Transform(
    m * this.s,
    m * this.r,
    m * this.tx + (1 - m) * x,
    m * this.ty + (1 - m) * y
  )
}

proto.rotateBy = function (radians, pivot) {
  // Parameter
  //   radians
  //     from positive x to positive y axis
  //   pivot
  //     optional, a [x, y] point
  //
  var co, si, x, y, shat, rhat, txhat, tyhat
  co = Math.cos(radians)
  si = Math.sin(radians)
  if (typeof pivot === 'undefined') {
    x = y = 0
  } else {
    x = pivot[0]
    y = pivot[1]
  }
  shat = this.s * co - this.r * si
  rhat = this.s * si + this.r * co
  txhat = (this.tx - x) * co - (this.ty - y) * si + x
  tyhat = (this.tx - x) * si + (this.ty - y) * co + y

  return new Transform(shat, rhat, txhat, tyhat)
}

proto.multiplyRight =
proto.multiplyBy = function (transform) {
  // Multiply this transformation matrix A
  // from the right with the given transformation matrix B
  // and return the result AB

  // For reading aid:
  // s -r tx  t.s -r tx
  // r  s ty *  r  s ty
  // 0  0  1    0  0  1
  var t = transform // alias
  var shat = this.s * t.s - this.r * t.r
  var rhat = this.s * t.r + this.r * t.s
  var txhat = this.s * t.tx - this.r * t.ty + this.tx
  var tyhat = this.r * t.tx + this.s * t.ty + this.ty

  return new Transform(shat, rhat, txhat, tyhat)
}

Transform.IDENTITY = new Transform(1, 0, 0, 0)
Transform.R90 = new Transform(0, 1, 0, 0)
Transform.R180 = new Transform(-1, 0, 0, 0)
Transform.R270 = new Transform(0, -1, 0, 0)
Transform.X2 = new Transform(2, 0, 0, 0)

module.exports = Transform

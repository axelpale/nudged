
var Transform = function (s, r, tx, ty) {
  // Public, to allow user access
  this.s = s
  this.r = r
  this.tx = tx
  this.ty = ty

  this.equals = function (t) {
    return (s === t.s && r === t.r && tx === t.tx && ty === t.ty)
  }

  this.getMatrix = function () {
    // Get the transformation matrix in the format common to
    // many APIs, including:
    // - kld-affine
    //
    // Return
    //   object o, having properties a, b, c, d, e, f:
    //   [ s  -r  tx ]   [ o.a  o.c  o.e ]
    //   [ r   s  ty ] = [ o.b  o.d  o.f ]
    //   [ 0   0   1 ]   [  -    -    -  ]
    return { a: s, b: r, c: -r, d: s, e: tx, f: ty }
  }

  this.getRotation = function () {
    // in rads
    return Math.atan2(r, s)
  }

  this.getScale = function () {
    // scale multiplier
    return Math.sqrt(r * r + s * s)
  }

  this.getTranslation = function () {
    // Current translation as a point.
    return [tx, ty]
  }

  this.toArray = function () {
    // Return an array representation of the transformation.
    //
    // Together with nudged.createFromArray(...), this method makes an easy
    // serialization and deserialization to and from JSON possible.
    return [s, r, tx, ty]
  }

  // Methods that return new points

  this.transform = function (p) {
    // p
    //   point [x, y] or array of points [[x1,y1], [x2, y2], ...]

    if (typeof p[0] === 'number') {
      // Single point
      return [s * p[0] - r * p[1] + tx, r * p[0] + s * p[1] + ty]
    } // else

    var i
    var c = []
    for (i = 0; i < p.length; i += 1) {
      c.push([s * p[i][0] - r * p[i][1] + tx, r * p[i][0] + s * p[i][1] + ty])
    }
    return c
  }

  // Methods that return new Transformations

  this.inverse = function () {
    // Return inversed transform instance
    // See note 2015-10-26-16-30
    var det = s * s + r * r
    // Test if singular transformation. These might occur when all the range
    // points are the same, forcing the scale to drop to zero.
    var eps = 0.00000001
    if (Math.abs(det) < eps) {
      throw new Error('Singular transformations cannot be inversed.')
    }
    var shat = s / det
    var rhat = -r / det
    var txhat = (-s * tx - r * ty) / det
    var tyhat = (r * tx - s * ty) / det
    return new Transform(shat, rhat, txhat, tyhat)
  }

  this.translateBy = function (dx, dy) {
    return new Transform(s, r, tx + dx, ty + dy)
  }

  this.scaleBy = function (multiplier, pivot) {
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
    return new Transform(m * s, m * r, m * tx + (1 - m) * x, m * ty + (1 - m) * y)
  }

  this.rotateBy = function (radians, pivot) {
    // Parameter
    //   radians
    //     from positive x to positive y axis
    //   pivot
    //     optional, a [x, y] point
    var co, si, x, y, shat, rhat, txhat, tyhat
    co = Math.cos(radians)
    si = Math.sin(radians)
    if (typeof pivot === 'undefined') {
      x = y = 0
    } else {
      x = pivot[0]
      y = pivot[1]
    }
    shat = s * co - r * si
    rhat = s * si + r * co
    txhat = (tx - x) * co - (ty - y) * si + x
    tyhat = (tx - x) * si + (ty - y) * co + y
    return new Transform(shat, rhat, txhat, tyhat)
  }

  this.multiplyRight =
  this.multiplyBy = function (transform) {
    // Multiply this transformation matrix A
    // from the right with the given transformation matrix B
    // and return the result AB

    // For reading aid:
    // s -r tx  t.s -r tx
    // r  s ty *  r  s ty
    // 0  0  1    0  0  1
    var t = transform // alias
    var shat = s * t.s - r * t.r
    var rhat = s * t.r + r * t.s
    var txhat = s * t.tx - r * t.ty + tx
    var tyhat = r * t.tx + s * t.ty + ty
    return new Transform(shat, rhat, txhat, tyhat)
  }
}

Transform.IDENTITY = new Transform(1, 0, 0, 0)
Transform.R90 = new Transform(0, 1, 0, 0)
Transform.R180 = new Transform(-1, 0, 0, 0)
Transform.R270 = new Transform(0, -1, 0, 0)
Transform.X2 = new Transform(2, 0, 0, 0)

module.exports = Transform

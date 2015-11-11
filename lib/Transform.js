
var Transform = function (s, r, tx, ty) {

  // Public, to allow user access
  this.s = s;
  this.r = r;
  this.tx = tx;
  this.ty = ty;

  this.equals = function (t) {
    return (s === t.s && r === t.r && tx === t.tx && ty === t.ty);
  };

  this.transform = function (p) {
    // p
    //   point [x, y] or array of points [[x1,y1], [x2, y2], ...]

    if (typeof p[0] === 'number') {
      // Single point
      return [s * p[0] - r * p[1] + tx, r * p[0] + s * p[1] + ty];
    } // else

    var i, c = [];
    for (i = 0; i < p.length; i += 1) {
      c.push([s * p[i][0] - r * p[i][1] + tx, r * p[i][0] + s * p[i][1] + ty]);
    }
    return c;
  };

  this.getMatrix = function () {
    return [[s, -r, tx], [r, s, ty], [0, 0, 1]];
  };

  this.getRotation = function () {
    // in rads
    return Math.atan2(r, s);
  };

  this.getScale = function () {
    // scale multiplier
    return Math.sqrt(r * r + s * s);
  };

  this.getTranslation = function () {
    return [tx, ty];
  };

  this.inverse = function () {
    // Return inversed transform instance
    // See note 2015-10-26-16-30
    var det = s * s + r * r;
    // Test if singular transformation. These might occur when all the range
    // points are the same, forcing the scale to drop to zero.
    var eps = 0.00000001;
    if (Math.abs(det) < eps) {
      throw new Error('Singular transformations cannot be inversed.');
    }
    var shat = s / det;
    var rhat = -r / det;
    var txhat = (-s * tx - r * ty) / det;
    var tyhat = ( r * tx - s * ty) / det;
    return new Transform(shat, rhat, txhat, tyhat);
  };

  this.rotate = function (radians) {

  };

  this.rotateFixed = function (radians, pivot) {

  };

  this.scale = function (multiplier) {

  };

  this.scaleFixed = function (multiplier, pivot) {

  };

  this.translate = function (dx, dy) {
    return new Transform(s, r, tx + dx, ty + dy);
  };

  this.multiply = function (transform) {
    // Multiply this transformation matrix A
    // from the right with the given transformation matrix B
    // and return the result AB

    // For reading aid:
    // s -r  x  t.s -r  x
    // r  s  y *  r  s  y
    // 0  0  1    0  0  1
    var t = transform; // alias
    var shat = s * t.s - r * t.r;
    var rhat = -s * t.r - r * t.s;
    var txhat = s * t.tx - r * t.ty + x;
    var tyhat = r * t.tx + s * t.ty + y;
    return new Transform(shat, rhat, txhat, tyhat);
  };
};

Transform.IDENTITY = new Transform(1, 0, 0, 0);

module.exports = Transform;

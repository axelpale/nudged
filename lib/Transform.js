
var Transform = function (s, r, tx, ty) {

  // Public, to allow user access
  this.s = s;
  this.r = r;
  this.tx = tx;
  this.ty = ty;

  this.transform = function (p) {
    // p
    //   point [x, y] or array of points [[x1,y1], [x2, y2], ...]

    if (typeof p[0] === 'number') {
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
};

module.exports = Transform;

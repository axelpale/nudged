
var Transform = function (s, r, tx, ty) {

  // Public, to allow user access
  this.s = s;
  this.r = r;
  this.tx = tx;
  this.ty = ty;

  this.transform = function (p) {
    // p
    //   point [x, y]
    return [s * p[0] - r * p[1] + tx, r * p[0] + s * p[1] + ty];
  };
};

module.exports = Transform;

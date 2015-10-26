var Emitter = require('component-emitter');
var Point = require('./Point');
var nudged = require('../../index');

var Model = function () {
  Emitter(this);

  this.domain = [];
  this.range = [];

  // Init with identity transform
  this.transform = nudged.estimate([], []);

  this._updateTransform = function () {
    var dom = this.domain.map(function (p) { return [p.x, p.y]; });
    var ran =  this.range.map(function (p) { return [p.x, p.y]; });
    this.transform = nudged.estimate(dom, ran);
  };

  this.addToDomain = function (x, y) {

    var name = this.domain.length.toString();
    var dp = new Point(x, y, name);
    // Guess the initial location by the current transform
    var initxy = this.transform.transform([x, y]);
    var rp = new Point(initxy[0], initxy[1], name);

    this.domain.push(dp);
    this.range.push(rp);

    var model = this;
    var updateModel = function () {
      model._updateTransform();
      model.emit('update');
    };
    dp.on('update', updateModel);
    rp.on('update', updateModel);

    this._updateTransform();
    this.emit('update');
  };

  this._findNearestPoint = function (list, x, y) {
    // Time complexity O(n) ≈ sloooow
    var i, p, dx, dy, d2, min_d2, min_p;
    min_d2 = Infinity;
    min_p = null;
    for (i = 0; i < list.length; i += 1) {
      p = list[i];
      dx = p.x - x;
      dy = p.y - y;
      d2 = dx * dx + dy * dy;
      if (d2 < min_d2) {
        min_d2 = d2;
        min_p = p;
      }
    }
    return min_p;
  };

  this.findNearestDomainPoint = function (x, y) {
    return this._findNearestPoint(this.domain, x, y);
  };

  this.findNearestRangePoint = function (x, y) {
    return this._findNearestPoint(this.range, x, y);
  };

  this.getDomain = function () {
    return this.domain;
  };

  this.getRange = function () {
    return this.range;
  };

  this.getTransform = function () {
    return this.transform;
  };
};


module.exports = Model;

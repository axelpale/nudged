var Emitter = require('component-emitter');
var Point = require('./Point');
var nudged = require('../../index');

var Model = function () {
  Emitter(this);

  this.domain = [];
  this.range = [];

  // If fixed point is set, pivot !== null
  // If so, we use fixed point transformation.
  this.pivot = null;

  // Init with identity transform
  this.transform = nudged.estimate('TSR', [], []);

  this.set = function (dom, ran) {
    // Replace model's domain and range.

    var piv, newtrans;
    this.domain = dom;
    this.range = ran;
    if (this.pivot === null) {
      newtrans = nudged.estimate('TSR', dom, ran);
      this.transform = this.transform.multiply(newtrans);
    } else {
      piv = [this.pivot.x, this.pivot.y];
      newtrans  = nudged.estimate('SR', dom, ran, piv);
      this.transform = this.transform.multiply(newtrans);
    }
    this.emit('update');
  };

  /*this.addFixedPoint = function (x, y) {
    this.pivot = new Point(x, y, 'X');
    var model = this;
    this.pivot.on('update', function () {
      model._updateTransform();
      model.emit('update');
    });

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

  this.findNearestDomainOrFixedPoint = function (x, y) {
    var points;
    if (this.pivot === null) {
      points = this.domain;
    } else {
      points = this.domain.concat([this.pivot]);
    }
    return this._findNearestPoint(points, x, y);
  };*/

  this.getDomain = function () {
    return this.domain;
  };

  this.getRange = function () {
    return this.range;
  };

  this.getFixedPoint = function () {
    return this.pivot;
  };

  this.getTransform = function () {
    return this.transform;
  };
};


module.exports = Model;

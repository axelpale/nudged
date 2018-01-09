var Emitter = require('component-emitter')
var Point = require('./Point')
var nudged = require('../../../index')

var Model = function () {
  Emitter(this)

  this.domain = []
  this.range = []

  // If fixed point is set, pivot !== null
  // If so, we use fixed point transformation.
  this.pivot = null

  // Init with identity transform
  this.transform = nudged.estimate('TSR', [], [])

  this._updateTransform = function () {
    var dom = this.domain.map(function (p) { return [p.x, p.y] })
    var ran = this.range.map(function (p) { return [p.x, p.y] })
    var piv
    if (this.pivot === null) {
      this.transform = nudged.estimate('TSR', dom, ran)
    } else {
      piv = [this.pivot.x, this.pivot.y]
      this.transform = nudged.estimate('SR', dom, ran, piv)
    }
  }

  this.addToDomain = function (x, y) {
    var name = this.domain.length.toString()
    var dp = new Point(x, y, name)
    // Guess the initial location by the current transform
    var initxy = this.transform.transform([x, y])
    var rp = new Point(initxy[0], initxy[1], name)

    this.domain.push(dp)
    this.range.push(rp)

    var model = this
    var updateModel = function () {
      model._updateTransform()
      model.emit('update')
    }
    dp.on('update', updateModel)
    rp.on('update', updateModel)

    this._updateTransform()
    this.emit('update')
  }

  this.addFixedPoint = function (x, y) {
    this.pivot = new Point(x, y, 'X')
    var model = this
    this.pivot.on('update', function () {
      model._updateTransform()
      model.emit('update')
    })

    this._updateTransform()
    this.emit('update')
  }

  this._findNearestPoint = function (list, x, y) {
    // Time complexity O(n) ≈ sloooow
    var i, p, dx, dy, d2, d2min, pmin
    d2min = Infinity
    pmin = null
    for (i = 0; i < list.length; i += 1) {
      p = list[i]
      dx = p.x - x
      dy = p.y - y
      d2 = dx * dx + dy * dy
      if (d2 < d2min) {
        d2min = d2
        pmin = p
      }
    }
    return pmin
  }

  this.findNearestDomainPoint = function (x, y) {
    return this._findNearestPoint(this.domain, x, y)
  }

  this.findNearestRangePoint = function (x, y) {
    return this._findNearestPoint(this.range, x, y)
  }

  this.findNearestDomainOrFixedPoint = function (x, y) {
    var points
    if (this.pivot === null) {
      points = this.domain
    } else {
      points = this.domain.concat([this.pivot])
    }
    return this._findNearestPoint(points, x, y)
  }

  this.getDomain = function () {
    return this.domain
  }

  this.getRange = function () {
    return this.range
  }

  this.getFixedPoint = function () {
    return this.pivot
  }

  this.getTransform = function () {
    return this.transform
  }
}

module.exports = Model

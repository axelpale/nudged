var Emitter = require('component-emitter')
var nudged = require('../../../index')

var Model = function () {
  Emitter(this)

  // Transformations
  var committed = nudged.Transform.IDENTITY
  var ongoing = nudged.Transform.IDENTITY
  var total = nudged.Transform.IDENTITY

  this.setGesture = function (ev) {
    var x = ev.center.x
    var y = ev.center.y
    var dx = ev.deltaX
    var dy = ev.deltaY
    var scale = ev.scale
    var rads = ev.rotation * Math.PI / 180
    var identity = nudged.Transform.IDENTITY
    ongoing = identity.translateBy(dx, dy)
      .scaleBy(scale, [x, y])
      .rotateBy(rads, [x, y])
    total = ongoing.multiplyBy(committed)

    this.emit('update', total)
  }

  this.commit = function () {
    // Execute after setGesture
    committed = total
    ongoing = nudged.Transform.IDENTITY
  }

  this.init = function () {
    // To emit the transformation
    this.emit('update', nudged.Transform.IDENTITY)
  }
}

module.exports = Model

var Emitter = require('component-emitter')

var Point = function (x, y, label) {
  Emitter(this)
  if (typeof label === 'undefined') { label = '' }

  this.x = x
  this.y = y
  this.label = label

  this.moveTo = function (x, y) {
    this.x = x
    this.y = y
    this.emit('update')
  }
}

module.exports = Point

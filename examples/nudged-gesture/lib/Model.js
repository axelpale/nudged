var Emitter = require('component-emitter')
var nudged = require('../../../index')

var Model = function () {
  Emitter(this)

  // For ongoing transformation, remember where the pointers started from
  // and keep track where they are now. We store this information to
  // the pointers variable. It has a property for each current pointer.
  //
  // Example:
  // {
  //   'pointerid': {dx: <domainx>, dy: <domainy>, rx: <rangex>, ry}
  // }
  var pointers = {}

  // Cumulated transformation. Like a history.
  var committedTransform = nudged.Transform.IDENTITY
  // When the history is combined with the ongoing transformation,
  // the result is total transformation.
  var totalTransform = nudged.Transform.IDENTITY

  var commit = function () {
    // Move ongoint transformation to the committed transformation so that
    // the total transformation stays the same.

    // Commit ongoingTransformation. As a result
    // the domain and range of all pointers become equal.
    var id, p, domain, range, t
    domain = []
    range = []
    for (id in pointers) {
      if (pointers.hasOwnProperty(id)) {
        p = pointers[id]
        domain.push([p.dx, p.dy])
        range.push([p.rx, p.ry]) // copies
        // Move transformation from current pointers;
        // Turn ongoingTransformation to identity.
        p.dx = p.rx
        p.dy = p.ry
      }
    }
    // Calculate the transformation to commit and commit it by
    // combining it with the previous transformations. Total transform
    // then becomes identical with the commited ones.
    t = nudged.estimateTSR(domain, range)
    committedTransform = t.multiplyBy(committedTransform)
    totalTransform = committedTransform
  }

  var updateTransform = function () {
    // Calculate the total transformation from the committed transformation
    // and the points of the ongoing transformation.

    var id, p, domain, range, t
    domain = []
    range = []
    for (id in pointers) {
      if (pointers.hasOwnProperty(id)) {
        p = pointers[id]
        domain.push([p.dx, p.dy])
        range.push([p.rx, p.ry])
      }
    }
    // Calculate ongoing transform and combine it with the committed.
    t = nudged.estimateTSR(domain, range)
    totalTransform = t.multiplyBy(committedTransform)
  }

  this.startTouchPoint = function (id, x, y) {
    // For each new touch.
    commit()
    pointers[id] = { dx: x, dy: y, rx: x, ry: y }
    updateTransform()
    this.emit('update', totalTransform)
  }

  this.moveTouchPoint = function (id, x, y) {
    // For each moved touch.
    if (pointers.hasOwnProperty(id)) {
      pointers[id].rx = x
      pointers[id].ry = y
      updateTransform()
      this.emit('update', totalTransform)
    }
  }

  this.endTouchPoint = function (id) {
    // For each removed touch.
    commit()
    delete pointers[id]
  }

  this.init = function () {
    // To emit the transformation
    this.emit('update', totalTransform)
  }
}

module.exports = Model

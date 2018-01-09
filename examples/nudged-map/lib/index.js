/*

A multitouch demonstration app for nudged.

The Tokyo Metro Map image is published to Wikimedia Commons by Hisagi. See:
https://commons.wikimedia.org/wiki/File:Tokyo_metro_map.png

*/
var loadimages = require('loadimages')
var makefullcanvas = require('./makefullcanvas')
var Model = require('./Model')

// var debugView = document.getElementById('debug')
var touchcanvas = document.getElementById('touchcanvas')
var ctx = touchcanvas.getContext('2d')

// Automatically resize canvas to screen.
makefullcanvas(touchcanvas)

loadimages('tokyo_metro_map_en.png', function (err, img) {
  if (err) {
    throw err
  }

  var model = new Model();

  (function defineHowToTransform () {
    // ### Design ###
    //
    // One high-level gesture G can consist of many child gestures,
    // g1, g2, and so on. For example, during a three-fingered gesture
    // a fourth finger can appear, move along with the three, and then
    // disappear, leaving the three fingers continue the gesture. We can see
    // this as one gesture <g1, g2, g3> that consists of two three-fingered
    // gestures {g1, g3} and one four-fingered gesture {g2}.
    //
    // The problem is how to update the transformation under the constant
    // possibility of fingers appearing or disappearing. We solve the problem
    // by keeping track of two transformations: 1) the combined transformation
    // caused by already ended child gestures, and 2) the transformation
    // of the ongoing child gesture. We call (1) the committed transformation,
    // (2) the ongoing transformation. Their combination we call the total
    // transformation.
    //
    // The ongoing transformation is ended either by appearing finger
    // or disappearing finger. We associate these with touchstart and
    // touchend/touchcancel events. When the ending happens, we calculate
    // the final state for the ongoing transformation and merge or commit it
    // to the committed transformation. Finally, we set the ongoing
    // transformation to identity transformation so that the total
    // transformation is kept constant.
    //
    // on touchstart
    //   Note, changedTouches include all new touches and nothing more [1].
    //   for each new touch
    //     Commit the ongoing transformation before the new touch.
    //     Start building new transformation and for that, store
    //     the places of current touches, including the new touches.
    //
    // on touchmove
    //   Note, changedTouches include all moved touches and nothing more [1].
    //   for each moved touch
    //     Update the current location of the touch but still remember
    //     where the touch was when the ongoing transformation started.
    //
    // on touchend or touchcancel
    //   changedTouches include all the removed touches and nothing more [1]
    //   for each removed touch
    //     commit the working transformation before removal
    //     store the placements of the fingers, excluding the removed touches
    //
    // model updates its readable transformation by each
    // touchstart and touchmove. Model sends 'update' event when this happens.
    // model.getTransform returns the committed transform multiplied
    // with the working transform.
    //
    // [1] https://developer.mozilla.org/en-US/docs/Web/Events/touchstart

    var onTouchStart = function (ev) {
      var cts, i
      cts = ev.changedTouches
      for (i = 0; i < cts.length; i += 1) {
        model.startTouchPoint(cts[i].identifier, cts[i].pageX, cts[i].pageY)
      }
      ev.preventDefault()
    }
    var onTouchMove = function (ev) {
      var cts, i
      cts = ev.changedTouches
      for (i = 0; i < cts.length; i += 1) {
        model.moveTouchPoint(cts[i].identifier, cts[i].pageX, cts[i].pageY)
      }
      ev.preventDefault()
    }
    var onTouchEndTouchCancel = function (ev) {
      var cts, i
      cts = ev.changedTouches
      for (i = 0; i < cts.length; i += 1) {
        model.endTouchPoint(cts[i].identifier)
      }
      ev.preventDefault()
    }

    touchcanvas.addEventListener('touchstart', onTouchStart)
    touchcanvas.addEventListener('touchmove', onTouchMove)
    touchcanvas.addEventListener('touchend', onTouchEndTouchCancel)
    touchcanvas.addEventListener('touchcancel', onTouchEndTouchCancel)

    // Mouse support

    var onMouseDown = function (ev) {
      model.startTouchPoint('mouse', ev.pageX, ev.pageY)
      ev.preventDefault()
    }

    var onMouseMove = function (ev) {
      model.moveTouchPoint('mouse', ev.pageX, ev.pageY)
      ev.preventDefault()
    }

    var onMouseUp = function (ev) {
      model.endTouchPoint('mouse')
      ev.preventDefault()
    }

    touchcanvas.addEventListener('mousedown', onMouseDown)
    touchcanvas.addEventListener('mousemove', onMouseMove)
    touchcanvas.addEventListener('mouseup', onMouseUp)
    touchcanvas.addEventListener('mouseout', onMouseUp)
  }())

  // Render the view each time the model changes.

  var initImgWidth = img.width
  var initImgHeight = img.height
  var initCanvasWidth = touchcanvas.width
  var initCanvasHeight = touchcanvas.height

  var initDx = Math.floor(initCanvasWidth / 2 - initImgWidth / 2)
  var initDy = Math.floor(initCanvasHeight / 2 - initImgHeight / 2)

  model.on('update', function (totalTransformation) {
    var tra = totalTransformation // alias

    // Clear. Otherwise some parts of the previous render might remain visible.
    ctx.clearRect(0, 0, touchcanvas.width, touchcanvas.height)

    // Range image: apply transform to it
    ctx.setTransform(tra.s, tra.r, -tra.r, tra.s, tra.tx, tra.ty)
    ctx.drawImage(img, initDx, initDy)
    ctx.setTransform(1, 0, 0, 1, 0, 0) // Reset transform
    // Alternative: ctx.resetTransform();
    // The alternative does not work on iOS
  })
  // Init model to emit first update.
  model.init()
})

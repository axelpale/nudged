/*

A demonstration app for nudged

*/
var Hammer = require('hammerjs')
var loadimages = require('loadimages')
var makefullcanvas = require('./makefullcanvas')
var Model = require('./Model')

// var debugView = document.getElementById('debug')
var touchcanvas = document.getElementById('touchcanvas')
var ctx = touchcanvas.getContext('2d')

// Automatically resize canvas to screen.
makefullcanvas(touchcanvas)

loadimages('castle.jpg', function (err, img) {
  if (err) {
    throw err
  }

  var model = new Model()

  var hammertime = new Hammer.Manager(touchcanvas);
  (function setupGestures () {
    var pan = new Hammer.Pan({
      direction: Hammer.DIRECTION_ALL, threshold: 0, pointers: 0
    })
    var pinch = new Hammer.Pinch({
      direction: Hammer.DIRECTION_ALL, threshold: 0, pointers: 0
    })
    var rotate = new Hammer.Rotate({
      direction: Hammer.DIRECTION_ALL, threshold: 0, pointers: 0
    })
    pan.recognizeWith(pinch)
    pinch.recognizeWith(rotate)
    hammertime.add(pan)
    hammertime.add(pinch)
    hammertime.add(rotate)
  }())

  hammertime.on('hammer.input', function (ev) {
    ev.preventDefault()
  })

  hammertime.on('panstart panmove', function (ev) {
    model.setGesture(ev)
  })

  hammertime.on('panend pancancel', function (ev) {
    // Store the transformation state
    model.commit()
  })

  // Output: view update
  model.on('update', function (totalTransformation) {
    var tra = totalTransformation // alias

    // Clear
    ctx.clearRect(0, 0, touchcanvas.width, touchcanvas.height)

    // Range image: apply transform to it
    ctx.setTransform(tra.s, tra.r, -tra.r, tra.s, tra.tx, tra.ty)
    ctx.drawImage(img, 256, 256, 256, 256)
    ctx.setTransform(1, 0, 0, 1, 0, 0) // Reset transform
    // Alternative: ctx.resetTransform();
    // does not work on iOS
  })
  // Init model to emit first update.
  model.init()
})

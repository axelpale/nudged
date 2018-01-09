module.exports = function (canvas) {
  // makeCanvasAutoFullwindow
  // Canvas is resized when window size changes, e.g.
  // when a mobile device is tilted.
  //
  // Parameter
  //   canvas
  //     HTML Canvas element
  //
  var resizeCanvas = function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  // resize the canvas to fill browser window dynamically
  window.addEventListener('resize', resizeCanvas, false)
  // Initially resized to fullscreen.
  resizeCanvas()
}

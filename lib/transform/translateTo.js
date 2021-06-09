module.exports = function (tr, point) {
  // Modify transformation so that it maps { x: 0, y: 0 }
  // to the given point.
  //
  // Parameters
  //   tr
  //     a transform
  //   point
  //     a point { x, y }
  //
  // Return
  //   a transform
  //
  return {
    a: tr.a,
    b: tr.b,
    x: point.x,
    y: point.y
  }
}

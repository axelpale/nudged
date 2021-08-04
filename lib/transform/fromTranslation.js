module.exports = function (p) {
  // Create a transform that translates { 0, 0 } to the point { x, y }
  //
  // Parameters
  //   p
  //     a point
  //
  // Return
  //   a point
  //
  // Example
  //   > let tl = nudged.transform.fromTranslation({ x: 4, y: 2 })
  //   > tl
  //   { a: 1, b: 0, x: 4, y: 2 }
  //
  return {
    a: 1,
    b: 0,
    x: p.x,
    y: p.y
  }
}

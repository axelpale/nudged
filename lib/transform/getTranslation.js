module.exports = function (tr) {
  // Get translation as a point { x, y }.
  //
  // Parameters
  //   tr
  //     a transform
  //
  // Return
  //   a point
  //
  return {
    x: tr.x,
    y: tr.y
  }
}

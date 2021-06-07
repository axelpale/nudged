module.exports = function (tr, p) {
  // Transform a point
  //
  // Parameters
  //   tr
  //     a transfrom
  //   p
  //     a xy point
  //
  // Return
  //   the transformed xy point
  //
  return {
    x: tr.a * p.x - tr.b * p.y + tr.x,
    y: tr.b * p.x + tr.a * p.y + tr.y
  }
}

module.exports = function (tr, p) {
  // Transform a point. The point is scaled and rotated
  // around some point and then translated, as the given transform specifies.
  //
  // Parameters
  //   tr
  //     a transfrom
  //   p
  //     a point { x, y }
  //
  // Return
  //   the transformed point
  //
  return {
    x: tr.a * p.x - tr.b * p.y + tr.x,
    y: tr.b * p.x + tr.a * p.y + tr.y
  }
}

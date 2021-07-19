module.exports = function (p, tr) {
  // Transform a point. The point is scaled and rotated
  // around origin and then translated, as the given transform specifies.
  //
  // Parameters
  //   p
  //     a point { x, y }
  //   tr
  //     a transfrom
  //
  // Return
  //   the transformed point
  //
  return {
    x: tr.a * p.x - tr.b * p.y + tr.x,
    y: tr.b * p.x + tr.a * p.y + tr.y
  }
}

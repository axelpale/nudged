module.exports = function (p, tr) {
  // @nudged.point.transform(p, tr)
  //
  // Transform a point. The point is first scaled and rotated
  // around origin and then translated.
  // This corresponds to a matrix multiplication *Mv*
  // where *M* is a 3x3 transformation matrix
  // and *v* is a 3x1 augmented 2D vector.
  //
  // Parameters
  //   p
  //     a point `{ x, y }`
  //   tr
  //     a transform
  //
  // Return
  //   a point, the transformed point
  //
  // Example
  // ```
  // > const tr = nudged.transform.ROT90
  // > nudged.point.transform({ x: 1, y: 0 }, tr)
  // { x: 0, y: 1 }
  // ```
  //
  return {
    x: tr.a * p.x - tr.b * p.y + tr.x,
    y: tr.b * p.x + tr.a * p.y + tr.y
  }
}

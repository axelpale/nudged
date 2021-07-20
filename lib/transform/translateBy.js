module.exports = function (tr, vec) {
  // Modify transformation so that its image
  // is translated by the given vector.
  // In other words it transforms points
  // further by the given vector.
  // Scale and rotation are kept intact.
  //
  // Parameters
  //   tr
  //     a transform
  //   vec
  //     a 2d vector { dx, dy }
  //
  // Return
  //   a transform
  //
  return {
    a: tr.a,
    b: tr.b,
    x: tr.x + vec.dx,
    y: tr.y + vec.dy
  }
}

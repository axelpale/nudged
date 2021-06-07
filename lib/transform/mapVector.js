module.exports = function (tr, vec) {
  // Transform a vector. Translation does not affect the vector.
  //
  // Parameters
  //   tr
  //     a transfrom
  //   vec
  //     a vector { dx, dy }
  //
  // Return
  //   the transformed vector
  //
  return {
    dx: tr.a * vec.dx - tr.b * vec.dy,
    dy: tr.b * vec.dx + tr.a * vec.dy
  }
}

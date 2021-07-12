module.exports = function (tr, vec) {
  // Transform a vector. Note that only scale and rotation affect the vector.
  // The translation does not affect the vector.
  //
  // Parameters
  //   tr
  //     a transfrom
  //   vec
  //     a vector { x, y }
  //
  // Return
  //   the transformed vector
  //
  return {
    x: tr.a * vec.x - tr.b * vec.y,
    y: tr.b * vec.x + tr.a * vec.y
  }
}

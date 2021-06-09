module.exports = (p, vec) => {
  // Parameters:
  //   p
  //     a point
  //   vec
  //     a vector
  //
  // Return
  //   point, translated by the vector
  //
  return {
    x: p.x + vec.dx,
    y: p.y + vec.dy
  }
}

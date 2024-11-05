module.exports = (p, q) => {
  // @nudged.point.equal(p, q)
  //
  // Test if the coordinates of two points are strictly equal.
  //
  // Parameters:
  //   p
  //     a point
  //   q
  //     a point
  //
  // Return
  //   a boolean
  //
  // Note that strict numerical equality is rarely true in practice
  // because of rounding errors caused by floating point arithmetics.
  // Consider using nudged.point.almostEqual instead.
  //
  return (p.x === q.x && p.y === q.y)
}

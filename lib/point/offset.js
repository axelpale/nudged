module.exports = (p, dx, dy) => {
  // @nudged.point.offset(p, dx, dy)
  //
  // Offset a point by scalars dx, dy.
  // This is equivalent to translation by the vector `{ x: dx, y: dy }`.
  //
  // Parameters:
  //   p
  //     a point
  //   dx
  //     a number, the horizontal offset
  //   dy
  //     a number, the vertical offset
  //
  // Return
  //   a point
  //
  return {
    x: p.x + dx,
    y: p.y + dy
  }
}

module.exports = (p, dx, dy) => {
  // Offset a point by scalars dx dy.
  //
  // Parameters:
  //   p
  //     a point
  //   dx
  //     a horizontal offset
  //   dy
  //     a vertical offset
  //
  // Return
  //   a point, translated by the vector { x: dx, y: dy }
  //
  return {
    x: p.x + dx,
    y: p.y + dy
  }
}

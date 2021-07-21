module.exports = (p, distance, angle) => {
  // Create a point away from p at the given distance and angle.
  //
  // Parameters
  //   p
  //     a point
  //   distance
  //     a number
  //   angle
  //     a number, angle in radians
  //
  return {
    x: p.x + distance * Math.cos(angle),
    y: p.y + distance * Math.sin(angle)
  }
}

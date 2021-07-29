module.exports = (p, distance, angle) => {
  // Create a point away from p at the given distance and angle.
  //
  // Parameters
  //   p
  //     a point
  //   distance
  //     a number
  //   angle
  //     a number, angle in radians.
  //     The angle `0` is towards pos. x-axis and grows towards pos. y-axis.
  //
  // Return
  //   a point
  //
  return {
    x: p.x + distance * Math.cos(angle),
    y: p.y + distance * Math.sin(angle)
  }
}

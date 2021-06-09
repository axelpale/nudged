module.exports = (p, q) => {
  // Distance between two points on the same plane.
  //
  // Parameters
  //   p
  //     point
  //   q
  //     point
  //
  // Return
  //   number
  //
  const dx = p.x - q.x
  const dy = p.y - q.y
  
  return Math.sqrt(dx * dx + dy * dy)
}

module.exports = (p) => {
  // Check if the point is a valid point object.
  //
  // Parameters
  //   p
  //     a point
  //
  // Return
  //   a boolean
  //
  // Examples
  //   > nudged.point.validate({ x: 1, y: 0 })
  //   true
  //   > nudged.point.validate({ x: 1 })
  //   false
  //
  if (typeof p.x !== 'number' || !Number.isFinite(p.x)) {
    return false
  }
  if (typeof p.y !== 'number' || !Number.isFinite(p.y)) {
    return false
  }
  return true
}

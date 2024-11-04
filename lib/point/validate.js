module.exports = (p) => {
  // @nudged.point.validate(p)
  //
  // Check if the point is a valid point object.
  // Valid point objects must have properties `x` and `y` that are finite numbers.
  // Valid point objects are allowed to have custom properties.
  //
  // Parameters
  //   p
  //     a point
  //
  // Return
  //   a boolean, true if `p` is a valid point.
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

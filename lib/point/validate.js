module.exports = (p) => {
  // Check if the point is a valid point object.
  //
  if (typeof p.x !== 'number' || !Number.isFinite(p.x)) {
    return false
  }
  if (typeof p.y !== 'number' || !Number.isFinite(p.y)) {
    return false
  }
  return true
}

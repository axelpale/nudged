module.exports = (p) => {
  // Check if the point is a valid point object.
  //
  if (typeof p.x !== 'number') {
    return false
  }
  if (typeof p.y !== 'number') {
    return false
  }
  return true
}

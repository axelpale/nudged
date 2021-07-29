const TOLERANCE = require('../tolerance')

module.exports = (tr) => {
  // Check if tr is valid, non-singular affine transformation.
  if (typeof tr.a !== 'number') {
    return false
  }
  if (typeof tr.b !== 'number') {
    return false
  }
  if (typeof tr.x !== 'number') {
    return false
  }
  if (typeof tr.y !== 'number') {
    return false
  }
  if (tr.a * tr.a + tr.b * tr.b < TOLERANCE) {
    // Scale zero is not allowed
    return false
  }
  return true
}

const TOLERANCE = require('../tolerance')

module.exports = (tr) => {
  // @nudged.transform.validate(tr)
  //
  // Check if tr is a valid, non-singular affine transformation.
  //
  // Parameters:
  //   tr
  //     a transform
  //
  // Return
  //   a boolean
  //
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

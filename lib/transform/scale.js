const EPSILON = require('./epsilon')

module.exports = function (tr, center, multiplier) {
  // Scale image of the transform so that the given
  // center point stays fixed. Called also homothety.
  //
  // Parameter
  //   tr
  //     a transform
  //   center
  //     a point
  //   multiplier
  //     a number
  //
  // Return
  //   a transform
  //
  const m = multiplier // alias
  const cx = center.x
  const cy = center.y
 
  if (m < EPSILON) {
    const msg = 'Expected positive scale factor but saw zero or negative: '
    throw new Error(msg + m)
  }
 
  return {
    a: m * tr.a,
    b: m * tr.b,
    x: m * tr.x + (1 - m) * cx,
    y: m * tr.y + (1 - m) * cy
  }
}

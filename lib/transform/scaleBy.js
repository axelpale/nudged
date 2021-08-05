const TOLERANCE = require('../tolerance')

module.exports = function (tr, center, multiplier) {
  // Scale image of the transform by the given multiplier
  // so that the given center point stays fixed.
  // The operation is also called
  // [homothety](https://en.wikipedia.org/wiki/Homothety).
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

  if (m < TOLERANCE) {
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

const TOLERANCE = require('../tolerance')

module.exports = function (center, multiplier) {
  // Create a transform that scales in respect of the center point and
  // the scale multiplier. Such transform is called a
  // [homothety](https://en.wikipedia.org/wiki/Homothety).
  //
  // Parameter
  //   center
  //     a point
  //   multiplier
  //     a number
  //
  // Return
  //   a transform
  //
  // Example:
  //   > let x2 = nudged.transform.fromScale({ x: 4, y: 2 }, 2)
  //   > x2
  //   { a: 2, b: 0, x: -4, y: -2 }
  //
  const m = multiplier // alias
  const cx = center.x
  const cy = center.y

  if (m < TOLERANCE) {
    const msg = 'Expected positive scale factor but saw zero or negative: '
    throw new Error(msg + m)
  }

  return {
    a: m,
    b: 0,
    x: (1 - m) * cx,
    y: (1 - m) * cy
  }
}

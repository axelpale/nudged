module.exports = function (center, scale, rotation) {
  // Create a nudged.transform object by using scale and rotation
  // in respect of a center point.
  //
  // Parameters:
  //   center
  //     a point
  //   scale
  //     a positive number. The scaling factor.
  //   rotation
  //     a number. Rotation in radians from positive x axis towards pos. y axis.
  //
  // Return
  //   a transform
  //
  // Example
  //   > const tr = nudged.transform.fromPolar({ x: 4, y: 2 }, 2, 0)
  //   > const p = { x: 2, y: 1 }
  //   > nudged.point.transform(p, tr)
  //   { x: 0, y: 0 }
  //
  const cx = center.x
  const cy = center.y

  const m = scale // alias
  if (m < 0) {
    const msg = 'Expected zero or positive scale factor but negative: '
    throw new Error(msg + m)
  }

  const co = Math.cos(rotation)
  const si = Math.sin(rotation)

  const ahat = co
  const bhat = si
  const xhat = (-cx) * co + cy * si + cx
  const yhat = (-cx) * si - cy * co + cy

  return {
    a: m * ahat,
    b: m * bhat,
    x: m * xhat + (1 - m) * cx,
    y: m * yhat + (1 - m) * cy
  }
}

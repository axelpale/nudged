module.exports = function (center, radians) {
  // Create a transform that rotates around the center by the radians.
  //
  // Parameter
  //   center
  //     a point
  //   radians
  //     a number, angle
  //
  // Return
  //   a transform
  //
  // Example:
  //   > let rot = nudged.transform.fromRotation({ x: 4, y: 2 }, Math.PI / 5)
  //   > rot
  //   { a: 0.809..., b: 0.587..., x: 1.939..., y: -1.969... }
  //
  const co = Math.cos(radians)
  const si = Math.sin(radians)

  const cx = center.x
  const cy = center.y

  const ahat = co
  const bhat = si
  const xhat = (-cx) * co + cy * si + cx
  const yhat = (-cx) * si - cy * co + cy

  return {
    a: ahat,
    b: bhat,
    x: xhat,
    y: yhat
  }
}

const TOLERANCE = require('../tolerance')

module.exports = function (p, q, tolerance) {
  // Test if two points are almost equal within the limit
  // given by the optional tolerance parameter.
  //
  // Parameters:
  //   p
  //     a point
  //   q
  //     a point
  //   tolerance
  //     Optional number
  //     Defaults to nudged.tolerance.
  //     Set to `0` for strict comparison.
  //
  // Return
  //   boolean
  //
  // Example
  //   > nudged.point.almostEqual({ x: 0, y: 0 }, { x: 0, y: 1.23e-16 })
  //   true
  //   > nudged.point.almostEqual({ x: 0, y: 0 }, { x: 0, y: 0.1 })
  //   false
  //   > nudged.point.almostEqual({ x: 0, y: 0 }, { x: 0, y: 0.1 }, 0.2)
  //   true
  //
  if (typeof tolerance !== 'number') {
    tolerance = TOLERANCE
  }

  const dx = Math.abs(p.x - q.x)
  const dy = Math.abs(p.y - q.y)

  // smaller-or-equal instead of smaller-than to make tolerance=0 work.
  return dx <= tolerance && dy <= tolerance
}

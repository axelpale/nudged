const EPSILON = require('../epsilon')

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
  //     optional number
  //     Defaults to nudged.epsilon.
  //     Set to 0 for strict comparison.
  //
  // Return
  //   boolean
  //
  if (typeof tolerance !== 'number') {
    tolerance = EPSILON
  }

  const dx = Math.abs(p.x - q.x)
  const dy = Math.abs(p.y - q.y)

  // smaller-or-equal instead of smaller-than to make epsilon=0 work.
  return dx <= tolerance && dy <= tolerance
}

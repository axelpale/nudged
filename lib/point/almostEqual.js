const EPSILON = require('../epsilon')

module.exports = function (pa, pb, epsilon) {
  // Are two points almost equal?
  //
  // Parameters:
  //   pa
  //     a point
  //   pb
  //     a point
  //   epsilon
  //     optional number, default to nudged.EPSILON.
  //     Set to 0 for strict comparison.
  //
  if (typeof epsilon !== 'number') {
    epsilon = EPSILON
  }

  const dx = Math.abs(pa.x - pb.x)
  const dy = Math.abs(pa.y - pb.y)

  // smaller-or-equal instead of smaller-than to make epsilon=0 work.
  return dx + dy <= epsilon
}

const transform = require('./transform')

module.exports = (points, tr) => {
  // Transform an array of points
  //
  // Parameters
  //   points
  //     an array of points
  //   tr
  //     a transform
  //

  // We generally avoid dynamic type checking but here
  // a single point instead of an array would
  // yield a vague { x: NaN, y: NaN } without error.
  if (!Array.isArray(ps)) {
    const type = typeof ps
    const msg = 'Expected an array but saw ' + type + ' instead.'
    throw TypeError(msg)
  }

  const ps = []
  for (let i = 0; i < points.length; i += 1) {
    ps.push(transform(points[i], tr))
  }
  return ps
}

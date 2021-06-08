const mapPoint = require('./mapPoint')

module.exports = function (tr, ps) {
  // Transform an array of points
  //
  // Parameters
  //   tr
  //     a transform
  //   ps
  //     an array of points
  //
  // Return
  //   array of points, transformed
  //

  // We generally avoid dynamic type checking but here
  // it is too easy to confuse mapPoint and mapPoints,
  // and especially because the bad use would only
  // yield a vague { x: NaN, y: NaN } without error.
  if (!Array.isArray(ps)) {
    const type = typeof ps
    const msg = 'Expected an array but saw ' + type + ' instead.'
    throw TypeError(msg)
  }

  const c = []
  for (let i = 0; i < ps.length; i += 1) {
    c.push(mapPoint(tr, ps[i]))
  }

  return c
}

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
  const c = []
  for (let i = 0; i < ps.length; i += 1) {
    c.push(mapPoint(tr, ps[i]))
  }
}

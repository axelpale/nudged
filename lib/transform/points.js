const transformPoint = require('./point')

module.exports = function (tr, ps) {
  // Transform an array of points
  //
  // Parameters
  //   tr
  //     a transform
  //   ps
  //     an array of points
  const c = []
  for (let i = 0; i < ps.length; i += 1) {
    c.push(transformPoint(tr, ps[i]))
  }
}

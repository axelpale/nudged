const distance = require('../point/distance')
const transformMany = require('../point/transformMany')

module.exports = (tr, domain, range) => {
  // Get an array of residuals i.e. the distances
  // between the range points and transformed domain points.
  //
  // Parameters
  //   tr
  //     an estimated transform
  //   domain
  //     an array of points. The domain used in the estimation.
  //   range
  //     an array of points. The range used in the estimation.
  //
  // Return
  //   array of numbers, distances
  //
  const n = Math.min(domain.length, range.length)
  const codomain = transformMany(domain, tr)

  // Collect point-pair distances to array.
  const arr = []
  for (let i = 0; i < n; i += 1) {
    arr.push(distance(codomain[i], range[i]))
  }

  return arr
}

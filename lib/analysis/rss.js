const transformMany = require('../point/transformMany')

module.exports = (tr, domain, range) => {
  // Compute residual sum of squares (RSS) that is
  // the sum of the squared distances between
  // the range points and transformed domain points.
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
  //   a positive number
  //
  const n = Math.min(domain.length, range.length)
  const codomain = transformMany(domain, tr)

  // Collect point-pair distances to array.
  let sum = 0
  let dx, dy
  for (let i = 0; i < n; i += 1) {
    dx = codomain[i].x - range[i].x
    dy = codomain[i].y - range[i].y
    sum += dx * dx + dy * dy
  }

  return sum
}

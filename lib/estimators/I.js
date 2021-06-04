const IDENTITY = require('../transform').IDENTITY

module.exports = function () {
  // Trivial estimator; Estimate is always identity transformation
  return IDENTITY
}

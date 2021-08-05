module.exports = function () {
  // The trivial estimator; The estimate is always the identity transformation.
  //
  // Example
  //   > nudged.estimators.I(domain, range)
  //   { a: 1, b: 0, x: 0, y: 0 }
  //
  return { a: 1, b: 0, x: 0, y: 0 }
}

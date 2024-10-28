module.exports = function () {
  // The trivial estimator; The estimate is always the identity transformation.
  //
  // Example
  //   > nudged.estimators.I(domain, range)
  //   { a: 1, b: 0, x: 0, y: 0 }
  //
  // Why this trivial estimator exists? If the estimator type becomes a variable in your application
  // then it is convenient to be able to disable estimation by just switching the estimator type to I.
  //
  return { a: 1, b: 0, x: 0, y: 0 }
}

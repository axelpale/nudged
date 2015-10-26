var estimate = require('./estimate');

module.exports = function estimateFixed(domain, range, pivot) {
  // Estimate optimal transformation given the domain and the range
  // so that the pivot point remains the same.
  //
  // Use cases
  //   - transform an image that has one corner fixed with a pin.
  //   - allow only scale and rotation by fixing the middle of the object
  //     to transform.
  //
  // Parameters
  //   domain, an array of [x, y] points
  //   range, an array of [x, y] points
  //   pivot, the point [x, y] that must remain constant in the tranformation.
  //
  var X, Y, px, py, N, X_hat, Y_hat, i;

  X = domain;
  Y = range;
  N = Math.min(X.length, Y.length);
  X_hat = [];
  Y_hat = [];

  px = pivot[0];
  py = pivot[1];

  for (i = 0; i < N; i += 1) {
    X_hat.push([X[i][0] - px, X[i][1] - py]);
    Y_hat.push([Y[i][0] - px, Y[i][1] - py]);
  }
  return estimate(X_hat, Y_hat);
};

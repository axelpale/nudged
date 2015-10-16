/*

*/
var Transform = require('./lib/Transform');


exports.estimate = function (domain, range) {
  // Parameters
  //   domain
  //     array of [x, y] 2D arrays
  //   range
  //     array of [x, y] 2D arrays

  // Alias
  var X = domain;
  var Y = range;

  // Is valid input
  if (X.length !== Y.length) {
    throw 'array length error'; // TODO
  }
  var N = X.length;

  var i, a, b, c, d;
  var a1 = 0;
  var b1 = 0;
  var c1 = 0;
  var d1 = 0;
  var a2 = 0;
  var b2 = 0;
  var ad = 0;
  var bc = 0;
  var ac = 0;
  var bd = 0;
  for (i = 0; i < N; i += 1) {
    a = X[i][0];
    b = X[i][1];
    c = Y[i][0];
    d = Y[i][1];
    a1 += a;
    b1 += b;
    c1 += c;
    d1 += d;
    a2 += a * a;
    b2 += b * b;
    ad += a * d;
    bc += b * c;
    ac += a * c;
    bd += b * d;
  }

  // Denominator
  var den = N * a2 + N * b2 - a1 * a1 - b1 * b1;

  var eps = 0.00000001;
  if (-eps < den && den < eps) {
    throw 'divided by zero, singular transformation matrix';
  }

  // Estimators
  var s, r, tx, ty;
  s = (N * (ac + bd) - a1 * c1 - b1 * d1) / den;
  r = (N * (ad - bc) + b1 * c1 - a1 * d1) / den;
  tx = (-a1 * (ac + bd) + b1 * (ad - bc) + a2 * c1 + b2 * c1) / den;
  ty = (-b1 * (ac + bd) - a1 * (ad - bc) + a2 * d1 + b2 * d1) / den;

  return new Transform(s, r, tx, ty);
};

exports.version = require('./lib/version');

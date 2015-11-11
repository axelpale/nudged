var Transform = require('./Transform');

var estimateScaling = function (domain, range) {
  var i, N, D, a, b, c, d, ac, bd, aa, bb, shat;

  N = Math.min(domain.length, range.length);
  ac = bd = aa = bb = 0;

  for (i = 0; i < N; i += 1) {
    a = domain[i][0];
    b = domain[i][1];
    c = range[i][0];
    d = range[i][1];
    ac += a * c;
    bd += b * d;
    aa += a * a;
    bb += b * b;
  }

  D = aa + bb;

  if (D === 0) {
    // D === 0 also if N === 0.
    // Assume identity transform be the best guess
    return Transform.IDENTITY;
  }

  // Negative scaling is prohibited because it equals to positive scaling with
  // rotation by π. We assume 0 be the best guess.
  shat = Math.max(0, (ac + bd) / D);

  return new Transform(shat, 0, 0, 0);
};


var estimateScalingFixed = function (domain, range, pivot) {
  var i, N, D, a0, b0, a, b, c, d, ac, bd, aa, bb, shat, tx, ty;

  N = Math.min(domain.length, range.length);
  ac = bd = aa = bb = 0;

  a0 = pivot[0];
  b0 = pivot[1];

  for (i = 0; i < N; i += 1) {
    a = domain[i][0] - a0;
    b = domain[i][1] - b0;
    c = range[i][0] - a0;
    d = range[i][1] - b0;
    ac += a * c;
    bd += b * d;
    aa += a * a;
    bb += b * b;
  }

  D = aa + bb;

  if (D === 0) {
    // All domain points equal the pivot.
    // Identity transform is then only solution.
    // D === 0 also if N === 0.
    // Assume identity transform be the best guess
    return Transform.IDENTITY;
  }

  shat = (ac + bd) / D;
  tx = (1 - shat) * a0;
  ty = (1 - shat) * b0;

  return new Transform(shat, 0, tx, ty);
};


module.exports = function (domain, range, pivot) {
  if (typeof pivot === 'undefined') {
    return estimateScaling(domain, range);
  } // else
  return estimateScalingFixed(domain, range, pivot);
};

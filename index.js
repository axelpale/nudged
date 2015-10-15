/*

*/
var Transform = require('./lib/Transform');

/*exports.estimate = function (pre, post) {
  // Parameters
  //   pre
  //     array of [x, y] 2D arrays
  //   post
  //     array of [x, y] 2D arrays

  // Alias
  var A = pre;
  var B = post;

  // Indices
  var x = 0;
  var y = 1;

  // Is valid input
  if (A.length !== B.length) {
    throw 'array length error'; // TODO
  }
  var N = A.length;

  // Translation estimation
  var i, tx, ty;
  tx = 0;
  ty = 0;
  for (i = 0; i < N; i += 1) {
    tx += B[i][x] - A[i][x];
    ty += B[i][y] - A[i][y];
  }
  tx /= N;
  ty /= N;

  // Scale and rotation estimation
  var ax, ay, bx, by;
  var axax = 0;
  var ayay = 0;
  var axbx = 0;
  var ayby = 0;
  var aybx = 0;
  var axby = 0;

  for (i = 0; i < N; i += 1) {
    ax = A[i][x];
    ay = A[i][y];
    bx = B[i][x] - tx; // Apply translation
    by = B[i][y] - ty;
    axax += ax * ax;
    ayay += ay * ay;
    axbx += ax * bx;
    ayby += ay * by;
    aybx += ay * bx;
    axby += ax * by;
  }

  var axaxayay = axax + ayay;
  var s = (axbx + ayby) / axaxayay;
  var r = (axby - aybx) / axaxayay;

  return new Transform(s, r, tx, ty);
};*/

exports.estimate = function (pre, post) {
  // Parameters
  //   pre
  //     array of [x, y] 2D arrays
  //   post
  //     array of [x, y] 2D arrays

  // Alias
  var A = pre;
  var B = post;

  // Indices
  var x = 0;
  var y = 1;

  // Is valid input
  if (A.length !== B.length) {
    throw 'array length error'; // TODO
  }
  var N = A.length;

  return new Transform(s, r, tx, ty);
};

exports.version = require('./lib/version');

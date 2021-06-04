exports.transform = require('./lib/transform')
exports.estimators = require('./lib/estimators')
exports.version = require('./lib/version')

exports.estimate = function (type, domain, range, pivot) {
  // Parameter
  //   type
  //     string. One of the following:
  //       'I', 'L', 'X', 'Y', 'T', 'S', 'R', 'TS', 'TR', 'SR', 'TSR'
  //   domain
  //     array of 2d arrays
  //   range
  //     array of 2d arrays
  //   pivot
  //     An optional 2d array for 'S', 'R', and 'SR'. An angle for 'L'.
  //
  var name = 'estimate' + type.toUpperCase()
  try {
    return exports[name](domain, range, pivot)
  } catch (e) {
    if (typeof exports[name] !== 'function') {
      throw new Error('Unknown estimator type: ' + type)
    }
    throw e
  }
}

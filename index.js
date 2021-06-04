exports.transform = require('./lib/transform')
exports.estimate = require('./lib/estimate')
exports.version = require('./lib/version')

exports.createFromArray = function (arr) {
  // Create a nudged.Transform instance from an array that was
  // previously created with nudged.Transform#toArray().
  //
  // Together with nudged.Transform#toArray(), this method makes an easy
  // serialization and deserialization to and from JSON possible.
  //
  // Parameter:
  //   arr
  //     array with four elements

  var s = arr[0]
  var r = arr[1]
  var tx = arr[2]
  var ty = arr[3]
  return new exports.Transform(s, r, tx, ty)
}

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

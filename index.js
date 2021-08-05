exports.Transform = require('./lib/Transform')
exports.estimateI = require('./lib/estimateI')
exports.estimateL = require('./lib/estimateL')
exports.estimateX = require('./lib/estimateX')
exports.estimateY = require('./lib/estimateY')
exports.estimateT = require('./lib/estimateT')
exports.estimateS = require('./lib/estimateS')
exports.estimateR = require('./lib/estimateR')
exports.estimateTS = require('./lib/estimateTS')
exports.estimateTR = require('./lib/estimateTR')
exports.estimateSR = require('./lib/estimateSR')
exports.estimateTSR = require('./lib/estimateTSR')
exports.version = require('./lib/version')

exports.create = function (scale, rotation, tx, ty) {
  // Create a nudged.Transform instance by using more meaningful parameters
  // than directly calling 'new nudged.Transform(...)'
  //
  // Parameters:
  //   scale
  //     number, the scaling factor
  //   rotation
  //     number, rotation in radians from positive x axis towards pos. y axis.
  //   tx
  //     translation toward pos. x
  //   ty
  //     translation toward pos. y

  if (typeof scale !== 'number') { scale = 1 }
  if (typeof rotation !== 'number') { rotation = 0 }
  if (typeof tx !== 'number') { tx = 0 }
  if (typeof ty !== 'number') { ty = 0 }

  var s = scale * Math.cos(rotation)
  var r = scale * Math.sin(rotation)
  return new exports.Transform(s, r, tx, ty)
}

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

// Expressions for createFromString
var cssMatrix = /\s*matrix\(([-+\w ,.%]+)\)/
var cssMatrixDelimiter = /\s*,\s*/

exports.createFromString = function (str) {
  // Create a nudged.Transform instance from a string that uses
  // the CSS transform matrix syntax: 'matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0)'
  //
  // Together with nudged.Transform#toString(), this method makes an easy
  // serialization and deserialization to and from strings.
  //
  // Note that the function does not yet support other CSS transform functions
  // such as 'translate' or 'perspective'. It might also give unexpected
  // results if the matrix exhibits shear or non-uniform scaling.
  //
  // Parameter:
  //   str
  //     string, the transform description
  //
  // Return
  //   a Transform
  //
  // Throws
  //   if no valid transform is found
  //
  var matrixMatch = str.match(cssMatrix)

  if (!matrixMatch) {
    throw new Error('Invalid CSS matrix string: ' + str)
  }

  var elemStrings = matrixMatch[1].split(cssMatrixDelimiter)
  var elems = []

  var i
  for (i = 0; i < elemStrings.length; i += 1) {
    elems.push(parseFloat(elemStrings[i]))
  }

  var s = elems[0]
  var r = elems[1]
  // skip [2][3] => forget shear or non-uniform scaling
  var tx = elems[4]
  var ty = elems[5]

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

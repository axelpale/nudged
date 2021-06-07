// transform
// Functions for transformation matrices, and to be exact,
// affine non-reflective similarity transformation matrices.
//

// ### Constants ###

exports.EPSILON = require('./epsilon')

// Identity transform, a kind of multiplication by 1.
exports.IDENTITY = {
  a: 1,
  b: 0,
  x: 0,
  y: 0
}

// Useful transformations
exports.ROT90 = { a: 0, b: 1, x: 0, y: 0 }
exports.ROT180 = { a: -1, b: 0, x: 0, y: 0 }
exports.ROT270 = { a: 0, b: -1, x: 0, y: 0 }
exports.HALF = { a: 0.5, b: 0, x: 0, y: 0 }
exports.X2 = { a: 2, b: 0, x: 0, y: 0 }

// ### Functions ###

exports.almostEqual =
exports.almostEquals = require('./almostEqual')

exports.create = require('./create')

exports.createFromPolar = require('./createFromPolar')

exports.createFromArray = require('./createFromArray')

exports.equal =
exports.equals = require('./equal')

exports.getRotation = require('./getRotation')

exports.getScale = require('./getScale')

exports.getTranslation = require('./getTranslation')

exports.toArray = require('./toArray')

exports.toMatrix = require('./toMatrix')

exports.toString = require('./toString')

exports.point = require('./point')

exports.points = require('./points')

exports.inverse = require('./inverse')

// exports.addVector = ?
// exports.translateBy =
exports.translate = require('./translate')

exports.scale = require('./scale')

exports.rotate = require('./rotate')

exports.compose =
exports.multiply = require('./multiply')

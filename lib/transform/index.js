//
// A transform is a plain object with the structure { a, b, x, y }.
// It represents a transformation matrix, and to be exact,
// an affine non-reflective similarity transformation matrix.
// Such transformation matrices are a compact way to represent
// translation, rotation, and scaling in a single 3x3 matrix.
// The matrix can be constructed from the transform object as below:
//
//     ┌ a -b  x ┐
//     │ b  a  y │
//     └ 0  0  1 ┘
//

// Singular transform, resembles multiplication by 0.
exports.SINGULAR = {
  a: 0,
  b: 0,
  x: 0,
  y: 0
}

// Identity transform, resembles multiplication by 1.
exports.IDENTITY = {
  a: 1,
  b: 0,
  x: 0,
  y: 0
}

const isqrt2 = 1 / Math.sqrt(2)

// Rotate around { x: 0, y: 0 } by 45 degrees.
exports.ROT45 = { a: isqrt2, b: isqrt2, x: 0, y: 0 }

// Rotate around { x: 0, y: 0 } by 90 degrees.
exports.ROT90 = { a: 0, b: 1, x: 0, y: 0 }

// Rotate around { x: 0, y: 0 } by 180 degrees.
exports.ROT180 = { a: -1, b: 0, x: 0, y: 0 }

// Rotate around { x: 0, y: 0 } by 270 degrees (= 3/4 turn = 3π/2).
exports.ROT270 = { a: 0, b: -1, x: 0, y: 0 }

// Scale towards { x: 0, y: 0 } by the factor of 0.5.
exports.HALF = { a: 0.5, b: 0, x: 0, y: 0 }

// Scale away from { x: 0, y: 0 } by the factor of 2.
exports.X2 = { a: 2, b: 0, x: 0, y: 0 }

exports.almostEqual =
exports.almostEquals = require('./almostEqual')

exports.compose = require('./compose')

exports.create = require('./create')

exports.equal =
exports.equals = require('./equal')

exports.fromPolar = require('./fromPolar')

exports.fromArray = require('./fromArray')

exports.getRotation = require('./getRotation')

exports.getScale = require('./getScale')

exports.getTranslation = require('./getTranslation')

exports.multiply = exports.compose

exports.inverse = require('./inverse')

exports.rotateBy = require('./rotateBy')
exports.rotateTo = require('./rotateTo')

exports.scaleBy = require('./scaleBy')
exports.scaleTo = require('./scaleTo')

exports.toArray = require('./toArray')

exports.toMatrix = require('./toMatrix')

exports.toString = require('./toString')

// exports.addVector = ?
// exports.translate =
exports.translateBy = require('./translateBy')
exports.translateTo = require('./translateTo')

exports.validate = require('./validate')

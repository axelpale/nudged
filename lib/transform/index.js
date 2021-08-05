//
// A transform is a plain object with the structure { a, b, x, y }.
// It defines a transformation matrix, and to be exact, an
// [augmented affine](https://en.wikipedia.org/wiki/Affine_transformation#Augmented_matrix)
// [non-reflective similarity](https://en.wikipedia.org/wiki/Similarity_(geometry))
// transformation matrix.
// Such transformation matrices are a compact way to represent
// translation, rotation, and scaling in a single 3x3 matrix.
// The matrix that the transform represents has the following elements:
//
//     ┌           ┐
//     │  a -b  x  │
//     │  b  a  y  │
//     │  0  0  1  │
//     └           ┘
//

// Singular transform, resembles multiplication by 0.
exports.SINGULAR = {
  a: 0,
  b: 0,
  x: 0,
  y: 0
}

// Identity transform, resembles multiplication by 1 in the way that
// it does not have any effect. You can use it as a starting point
// to build other transformations.
//
//     const I = nudged.transform.IDENTITY
//     const center = { x: 320, y: 240 }
//     const angle = Math.PI / 5
//     const rotation = nudged.transform.rotateBy(I, center, angle)
//
exports.IDENTITY = {
  a: 1,
  b: 0,
  x: 0,
  y: 0
}

const isqrt2 = 1 / Math.sqrt(2)

// A prebuilt transform. Rotates around { x: 0, y: 0 } by 45 degrees.
//
// Example:
//
//     > const R = nudged.transform.ROT45
//     > nudged.transform.getRotation(R) * 360 / (2 * Math.PI)
//     45
//     > nudged.point.transform({ x: 1, y: 0 }, R)
//     { x: 0.7071..., y: 0.7071... }
//
exports.ROT45 = { a: isqrt2, b: isqrt2, x: 0, y: 0 }

// A prebuilt transform. Rotates around { x: 0, y: 0 } by 90 degrees.
exports.ROT90 = { a: 0, b: 1, x: 0, y: 0 }

// A prebuilt transform. Rotates around { x: 0, y: 0 } by 180 degrees.
exports.ROT180 = { a: -1, b: 0, x: 0, y: 0 }

// A prebuilt transform. Rotates around { x: 0, y: 0 } by 270 degrees (= 3/4 turn = 3π/2).
exports.ROT270 = { a: 0, b: -1, x: 0, y: 0 }

// A prebuilt transform. Scales towards { x: 0, y: 0 } by the factor of 0.5.
exports.HALF = { a: 0.5, b: 0, x: 0, y: 0 }

// A prebuilt transform. Scales away from { x: 0, y: 0 } by the factor of 2.
exports.X2 = { a: 2, b: 0, x: 0, y: 0 }

exports.almostEqual = require('./almostEqual')

exports.compose = require('./compose')

exports.create = require('./create')

exports.equal = require('./equal')

exports.fromArray = require('./fromArray')

exports.fromPolar = require('./fromPolar')

exports.fromRotation = require('./fromRotation')

exports.fromScale = require('./fromScale')

exports.fromString = require('./fromString')

exports.fromTranslation = require('./fromTranslation')

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

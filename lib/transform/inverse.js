const EPSILON = require('./epsilon')

module.exports = function (tr) {
 // Return inversed transform
 // See note 2015-10-26-16-30
 const det = tr.a * tr.a + tr.b * tr.b
 // Test if singular transformation. These might occur when all the range
 // points are the same, forcing the scale to drop to zero.
 if (Math.abs(det) < EPSILON) {
   throw new Error('Singular transformations cannot be inversed.')
 }
 const ahat = tr.a / det
 const bhat = -tr.b / det
 const xhat = (-tr.a * tr.x - tr.b * tr.y) / det
 const yhat = (tr.b * tr.x - tr.a * tr.y) / det

 return {
   a: ahat,
   b: bhat,
   x: xhat,
   y: yhat
 }
}

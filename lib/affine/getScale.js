module.exports = function (tr) {
  // Return the scale multiplier of the transformation.
  return Math.sqrt(tr.b * tr.b + tr.a * tr.a)
}

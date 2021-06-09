module.exports = function (tr) {
  // Get rotation in radians.
  return Math.atan2(tr.b, tr.a)
}

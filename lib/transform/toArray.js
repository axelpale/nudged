module.exports = function (tr) {
  // Represent the transform as a 4-element array.
  // This the array is compatible with nudged.transform.fromArray.
  //
  // Parameters
  //   tr
  //     a transform
  //
  // Return
  //   an array [a, b, x, y]
  //
  return [tr.a, tr.b, tr.x, tr.y]
}

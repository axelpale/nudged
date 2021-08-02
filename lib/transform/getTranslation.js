module.exports = function (tr) {
  // Get the translating component of the given transform
  // as a vector { x, y }.
  //
  // Parameters
  //   tr
  //     a transform
  //
  // Return
  //   a point
  //
  // Example
  //   > const t = nudged.transform.ROT45
  //   > nudged.transform.getTranslation(t)
  //   { x: 0, y: 0 }
  //
  return {
    x: tr.x,
    y: tr.y
  }
}

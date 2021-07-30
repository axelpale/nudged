module.exports = function (tr, ts) {
  // Are transforms equal?
  //
  // Parameters:
  //   tr
  //     a transform
  //   ts
  //     a transform
  //
  // Return
  //   a boolean
  //
  return (tr.a === ts.a && tr.b === ts.b &&
    tr.x === ts.x && tr.y === ts.y)
}

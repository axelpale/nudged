module.exports = function (tr, ts) {
  // @nudged.transform.equal(tr, ts)
  //
  // Test that the transforms are strictly equal.
  // Transforms are strictly equal if every corresponding element is `===` equal.
  // Note that in practice, rounding errors of floating point arithmetics often break
  // strict equality.
  // For loose equality, see [almostEqual](#nudgedtransformalmostequal).
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

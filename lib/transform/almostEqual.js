const TOLERANCE = require('../tolerance')

module.exports = function (tr, ts, tolerance) {
  // @nudged.transform.almostEqual(tr, ts, tolerance)
  //
  // Are two transforms almost equal?
  // Due to the limitations of floating point precision,
  // most operations have a little numerical error in their results.
  // Two matrices that should be equivalent according to algebra,
  // might not have strictly equivalent elements.
  // Therefore some tolerance is often necessary in practice.
  // See nudged.transform.equal for strict comparison.
  //
  // Parameters:
  //   tr
  //     a transform
  //   ts
  //     a transform
  //   tolerance
  //     optional number, default to nudged.tolerance.
  //     Set to `0` for strict comparison.
  //
  // Return
  //   a boolean. True if the transforms are equal or almost equal.
  //
  // How the error is computed? For the difference metric, we use a modified L1 norm
  // that values a, b, x, and y equally. If the sum of the differences
  // is smaller or equal to the tolerance, consider the transforms equal.
  //

  // Note:
  //   We first thought to use Frobenius norm to compare
  //   against tolerance but it felt wrong
  //   because it exaggerates a and b. Proof:
  //     We know Frobenius norm for real square matrices:
  //       Norm(A) = sqrt(sum_i(sum_j(a_ij * a_ij)))
  //     For a transform it looks like:
  //       Norm(T) = sqrt(a*a + b*b + x*x + b*b + a*a + y*y + 1)
  //     Thus a and b have twice the impact.
  //
  if (typeof tolerance !== 'number') {
    tolerance = TOLERANCE
  }

  const da = Math.abs(tr.a - ts.a)
  const db = Math.abs(tr.b - ts.b)
  const dx = Math.abs(tr.x - ts.x)
  const dy = Math.abs(tr.y - ts.y)

  // smaller-or-equal instead of smaller-than to make tolerance=0 work.
  return da + db + dx + dy <= tolerance
}

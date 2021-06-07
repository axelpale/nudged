const EPSILON = require('./epsilon')

module.exports = function (tr, ts, epsilon) {
  // Are two transforms almost equal? Return true if a matrix norm
  // of the difference is smaller than epsilon. We use modified L1 norm
  // that values a, B, x, and y as equally important.
  //
  // Parameters:
  //   tr
  //     a transform
  //   ts
  //     a transform
  //   epsilon
  //     optional number, default to transform.EPSILON.
  //     Set to 0 for strict comparison.
  //
  // Note:
  //   We first thought to use Frobenius norm to compare
  //   against epsilon but it felt wrong
  //   because it exaggerates a and b. Proof:
  //     We know Frobenius norm for real square matrices:
  //       Norm(A) = sqrt(sum_i(sum_j(a_ij * a_ij)))
  //     For a transform it looks like:
  //       Norm(T) = sqrt(a*a + b*b + x*x + b*b + a*a + y*y + 1)
  //     Thus a and b have twice the impact.
  //
  if (typeof epsilon !== 'number') {
    epsilon = EPSILON
  }

  const da = Math.abs(tr.a - ts.a)
  const db = Math.abs(tr.b - ts.b)
  const dx = Math.abs(tr.x - ts.x)
  const dy = Math.abs(tr.y - ts.y)

  // smaller-or-equal instead of smaller-than to make epsilon=0 work.
  return da + db + dx + dy <= epsilon
}

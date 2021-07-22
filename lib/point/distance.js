module.exports = (p, q) => {
  // Distance between two points.
  // Also called Euclidean norm or L2-norm.
  //
  // Parameters
  //   p
  //     a point
  //   q
  //     a point
  //
  // Return
  //   a distance from p to q (= distance from q to p)
  //
  const dx = p.x - q.x
  const dy = p.y - q.y

  return Math.sqrt(dx * dx + dy * dy)
}

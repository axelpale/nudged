module.exports = (p, q) => {
  // The Euclidean distance between two points.
  // Also called the Euclidean norm alias L2-norm.
  //
  // Parameters
  //   p
  //     a point
  //   q
  //     a point
  //
  // Return
  //   number, the distance from p to q (= distance from q to p)
  //
  const dx = p.x - q.x
  const dy = p.y - q.y

  return Math.sqrt(dx * dx + dy * dy)
}

module.exports = (p, q) => {
  // A vector from point p to point q
  //
  // Return
  //   vector
  //
  return {
    dx: p.x - q.x,
    dy: p.y - q.y
  }
}

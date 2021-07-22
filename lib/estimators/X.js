module.exports = function (domain, range) {
  // Estimate horizontal translation that is a translation along x-axis.
  //
  // Parameters
  //   domain
  //     array of points
  //   range
  //     array of points
  //
  // Return
  //   a transform
  //
  const N = Math.min(domain.length, range.length)

  if (N < 1) {
    // No point pairs. Assume identity transform to be the best guess.
    return { a: 1, b: 0, x: 0, y: 0 }
  }

  let dxs = 0 // domain x sum
  let rxs = 0 // range x sum
  for (let i = 0; i < N; i += 1) {
    dxs += domain[i].x
    rxs += range[i].x
  }

  return {
    a: 1,
    b: 0,
    x: (rxs - dxs) / N,
    y: 0
  }
}

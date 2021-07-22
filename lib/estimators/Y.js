module.exports = function (domain, range) {
  // Estimate vertical translation that is a translation along y-axis.
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

  let dys = 0
  let rys = 0
  for (let i = 0; i < N; i += 1) {
    dys += domain[i].y
    rys += range[i].y
  }

  return {
    a: 1,
    b: 0,
    x: 0,
    y: (rys - dys) / N
  }
}

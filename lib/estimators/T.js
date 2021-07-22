module.exports = function (domain, range) {
  // Estimate translation that maps domain points close to range points.
  //
  // Parameters:
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
    // No points; Assume identity transform be the best guess
    return { a: 1, b: 0, x: 0, y: 0 }
  }

  let dxs = 0 // domain sum x
  let dys = 0
  let rxs = 0 // range sum x
  let rys = 0
  for (let i = 0; i < N; i += 1) {
    dxs += domain[i].x
    dys += domain[i].y
    rxs += range[i].x
    rys += range[i].y
  }

  const xhat = (rxs - dxs) / N
  const yhat = (rys - dys) / N

  return {
    a: 1,
    b: 0,
    x: xhat,
    y: yhat
  }
}

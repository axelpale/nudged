module.exports = (arrp) => {
  // @nudged.point.fromArray(arrp)
  //
  // Create a point `{ x, y }` from an array `[x, y]`.
  //
  // Parameters
  //   arrp
  //     an array with two elements.
  //
  // Return
  //   a point
  //
  // Throws
  //   if the array has unexpected number of elements.
  //
  if (arrp.length !== 2) {
    throw new Error('Cannot read a point from array: ' + JSON.stringify(arrp))
  }

  return {
    x: arrp[0],
    y: arrp[1]
  }
}

module.exports = (arrtr) => {
  // Convert a transform represented as an 4-element array (nudged v1) to
  // a abxy object (nudged v2).
  //
  // Return
  //   a transform
  //
  return {
    a: arrtr[0],
    b: arrtr[1],
    x: arrtr[2],
    y: arrtr[3]
  }
}

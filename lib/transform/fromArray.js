module.exports = (arrtr) => {
  // Convert a transform represented as an 4-element array
  // to a transform object { a, b, x, y }.
  // Compatible with nudged.transform.toArray.
  //
  // Parameters
  //   arrtr
  //     an array with four number elements [a, b, x, y]
  //
  // Return
  //   a transform
  //
  // Example
  //   > nudged.transform.fromArray([1, 2, 3, 4])
  //   { a: 1, b: 2, x: 3, y: 4 }
  //
  return {
    a: arrtr[0],
    b: arrtr[1],
    x: arrtr[2],
    y: arrtr[3]
  }
}

module.exports = function (abxy) {
  // Create an affine from 4-element array.
  //
  // Parameter
  //   abxy
  //     array with four number elements
  //
  // Return
  //   an affine
  //
  return {
    a: abxy[0],
    b: abxy[1],
    x: abxy[2],
    y: abxy[3]
  }
}

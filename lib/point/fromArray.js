module.exports = (arrp) => {
  // Create a point { x, y } from an array [x, y].
  //
  // Parameters
  //   arrp
  //     an array with two elements
  //
  // Return
  //   a point
  //
  if (arrp.length !== 2) {
    throw new Error('Cannot read a point from array: ' + JSON.stringify(arrp))
  }

  return {
    x: arrp[0],
    y: arrp[1]
  }
}

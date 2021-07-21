module.exports = (arrp) => {
  // Create { x, y } point from array [x, y]
  //
  if (arrp.length !== 2) {
    throw new Error('Cannot read a point from array: ' + JSON.stringify(arrp))
  }

  return {
    x: arrp[0],
    y: arrp[1]
  }
}

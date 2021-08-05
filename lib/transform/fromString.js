// Expressions for createFromString
const cssMatrix = /\s*matrix\(([-+\w ,.%]+)\)/
const cssMatrixDelimiter = /\s*,\s*/

module.exports = function (str) {
  // Create a transform from a string that uses
  // the CSS transform matrix syntax: 'matrix(1.0, 2.0, 3.0, 4.0, 5.0, 6.0)'
  //
  // Together with nudged.transform.toString this method makes an easy
  // serialization and deserialization to and from strings.
  //
  // Note that the function does not yet support other CSS transform functions
  // such as 'translate' or 'perspective'. It might also give unexpected
  // results if the matrix exhibits shear or non-uniform scaling.
  //
  // Parameters:
  //   str
  //     a string, the CSS matrix description
  //
  // Return
  //   a transform
  //
  // Throws
  //   if no valid transform is found
  //
  const matrixMatch = str.match(cssMatrix)

  if (!matrixMatch) {
    throw new Error('Invalid CSS matrix string: ' + str)
  }

  const elemStrings = matrixMatch[1].split(cssMatrixDelimiter)
  const elems = elemStrings.map((els) => parseFloat(els))

  // skip [2][3] => forget shear or non-uniform scaling
  return {
    a: elems[0],
    b: elems[1],
    x: elems[4],
    y: elems[5]
  }
}

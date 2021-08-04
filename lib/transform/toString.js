module.exports = function (tr) {
  // Return a string of CSS transform-function data type.
  //
  // Together with nudged.transform.fromString, this method allows
  // serialization to and from strings.
  //
  // Example
  //   > let sc = nudged.transform.fromScale({ x: 4, y: 2 }, 2)
  //   > nudged.transform.toString(sc)
  //   'matrix(2.00000000,0.00000000,0.00000000,2.00000000,-4.00000000,-2.00000000)'
  //
  // The matrix values are fixed to 8 decimals. This prevents bugs
  // caused by the scientific notation e.g. '1e-12'. The default JavaScript
  // number-to-string conversion might produce scientific notation with
  // some very large and very small numbers. The scientific notation is not
  // understood by all CSS parsers. We have experienced problems with
  // Safari and Opera. Therefore toString must prevent the scientific
  // notation here and convert to fixed number of decimal places.
  // See [SO](https://stackoverflow.com/q/1685680/638546) for further details.
  //
  const a = tr.a.toFixed(8)
  const b = tr.b.toFixed(8)
  const c = (-tr.b).toFixed(8) // Unnecessary? Maybe '-' + b? No, e.g. '--1.2'
  const x = tr.x.toFixed(8)
  const y = tr.y.toFixed(8)
  return 'matrix(' + a + ',' + b + ',' + c + ',' + a + ',' + x + ',' + y + ')'
}

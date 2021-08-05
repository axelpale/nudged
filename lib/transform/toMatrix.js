module.exports = function (tr) {
  // Get the similarity transformation matrix
  // in the format common to other APIs, including:
  //
  // - [DOMMatrix](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix)
  // - [WebKitCSSMatrix](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix)
  // - [kld-affine](https://github.com/thelonious/kld-affine)
  //
  // Parameters
  //   tr
  //     a transform
  //
  // Return
  //   an object { a, b, c, d, e, g } that represents the matrix below.
  //
  //
  //     ┌           ┐
  //     │  a  c  e  │
  //     │  b  d  f  │
  //     │  0  0  1  │
  //     └           ┘
  //
  // Example
  //   > nudged.transform.toMatrix(tr)
  //   { a: 0.48, c: -0.52, e: 205.04,
  //     b: 0.52, d: 0.48, f: 4.83 }
  //
  return {
    a: tr.a,
    b: tr.b,
    c: -tr.b,
    d: tr.a,
    e: tr.x,
    f: tr.y
  }
}

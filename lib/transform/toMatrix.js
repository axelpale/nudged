module.exports = function (tr) {
  // Get the similarity transformation matrix
  // in the format common to other APIs, including:
  // - kld-affine
  // - MDN documentation in some parts
  //
  // Return
  //   object o, having properties a, b, c, d, e, f:
  //   [ a  -b   x ]   [ o.a  o.c  o.e ]
  //   [ b   a   y ] = [ o.b  o.d  o.f ]
  //   [ 0   0   1 ]   [  -    -    -  ]
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

const es = require('./estimators')

module.exports = function (params) {
  // Estimate a transformation of the given type and constraints.
  // Internally, calls the estimator of the given type.
  // For maximal efficiency, use the estimator functions directly.
  //
  // Parameters:
  //   params
  //     estimator
  //       required string. The freedom of the transform. One of the following:
  //         'I', 'L', 'X', 'Y', 'T', 'S', 'R', 'TS', 'TR', 'SR', 'TSR'
  //     domain
  //       required array of points { x, y }
  //     range
  //       required array of points { x, y }
  //     center
  //       optional point. Used as the center by types 'S', 'R', and 'SR'.
  //       If a type other than these is selected,
  //       the center has no effect to the estimation.
  //     angle
  //       optional number. Angle in radians.
  //       Used by the type 'L'.
  //       If a type other than 'L' is selected,
  //       the angle has no effect the estimation.
  //
  // Return
  //   a transform object
  //
  switch (params.estimator.toUpperCase()) {
    case 'I':
      return es.I()
    case 'L':
      return es.L(params.angle, params.domain, params.range)
    case 'X':
      return es.X(params.domain, params.range)
    case 'Y':
      return es.Y(params.domain, params.range)
    case 'T':
      return es.T(params.domain, params.range)
    case 'S':
      return es.S(params.center, params.domain, params.range)
    case 'R':
      return es.R(params.center, params.domain, params.range)
    case 'TS':
      return es.TS(params.domain, params.range)
    case 'TR':
      return es.TR(params.domain, params.range)
    case 'SR':
      return es.SR(params.center, params.domain, params.range)
    case 'TSR':
      return es.TSR(params.domain, params.range)
    default:
      throw new Error('Unknown estimator type: ' + params.type)
  }
}

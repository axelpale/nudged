const es = require('./estimators')

module.exports = function (params) {
  // Estimate a transformation of the given type and constraints.
  // Internally, calls the estimator of the given type.
  // For maximal efficiency, use the estimator functions directly
  // via nudged.estimators.
  //
  // Parameters:
  //   `params`, an object with properties:
  //     estimator
  //       Required string. The freedom of the transform.
  //       One of the following:
  //       ..'I', 'L', 'X', 'Y', 'T', 'S', 'R', 'TS', 'TR', 'SR', 'TSR'
  //     domain
  //       required array of points { x, y }.
  //       The points before the transform.
  //     range
  //       required array of points { x, y }.
  //       The points after the transform.
  //     center
  //       optional point.
  //       Used as the center by the estimators 'S', 'R', and 'SR'.
  //       If an estimator other than these is selected,
  //       ..the center has no effect to the estimation.
  //     angle
  //       optional number. Angle in radians.
  //       Used by the estimator 'L'.
  //       If an estimator other than 'L' is selected,
  //       ..the angle has no effect to the estimation.
  //
  // Return
  //   a transform object
  //
  switch (params.estimator.toUpperCase()) {
    case 'I':
      return es.I()
    case 'L':
      return es.L(params.domain, params.range, params.angle)
    case 'X':
      return es.X(params.domain, params.range)
    case 'Y':
      return es.Y(params.domain, params.range)
    case 'T':
      return es.T(params.domain, params.range)
    case 'S':
      return es.S(params.domain, params.range, params.center)
    case 'R':
      return es.R(params.domain, params.range, params.center)
    case 'TS':
      return es.TS(params.domain, params.range)
    case 'TR':
      return es.TR(params.domain, params.range)
    case 'SR':
      return es.SR(params.domain, params.range, params.center)
    case 'TSR':
      return es.TSR(params.domain, params.range)
    default:
      throw new Error('Unknown estimator type: ' + params.type)
  }
}

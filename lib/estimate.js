const es = require('./estimators')

module.exports = function (params) {
  // Estimates a transformation with the selected estimator and constraints.
  // See nudged.estimators for available estimators.
  //
  // Parameters:
  //   `params`, an object with properties:
  //     estimator
  //       Required string. The name of the estimator.
  //       Defines the freedom of the transform to compute.
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
  //   a transform
  //
  // Internally, this calls the function of the selected estimator.
  // Therefore, if you desire maximal efficiency instead of flexibility,
  // use the estimator functions directly via nudged.estimators,
  // like for example `nudged.estimators.R(domain, range, center)`
  //
  // Example
  //   > const domain = [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 1, y: 2 }]
  //   > const range  = [{ x: 1, y: 1 }, { x: 1, y: 3 }, { x: -1, y: 2 }]
  //   > const center = { x: 0, y: 0 }
  //   > const tr = nudged.estimate({
  //       estimator: 'SR',
  //       domain: domain,
  //       range: range,
  //       center: center
  //     })
  //   > nudged.transform.getScale(tr)
  //   1.242259
  //   > nudged.transform.getRotation(tr)
  //   1.107148
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

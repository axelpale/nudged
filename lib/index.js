// @nudged
//
// The estimators and related tools are grouped into namespaces.
// The `estimate` function and `estimators` namespace provide the core
// features for computing transformations between point sets.
// The `point` and `transform` namespaces provide basic tools to work with
// the estimated transformations and 2D points.
// The `analysis` provides tools to assess the quality of computed estimates
// and to detect outliers in point pairs.
//

exports.estimate = require('./estimate')

exports.estimators = require('./estimators')

exports.point = require('./point')

exports.transform = require('./transform')

exports.analysis = require('./analysis')

exports.tolerance = require('./tolerance')

// @nudged.version
//
// Contains the module version string identical to
// the version tag in *package.json*.
// This feature is powered by
// [genversion](https://github.com/axelpale/genversion).
//
// Example:
//
//     > nudged.version
//     '2.3.4'
//
exports.version = require('./version')

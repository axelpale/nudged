// The code follows the functional, classless, immutable paradigm.
// All the functions take in only plain objects and values such as
// { x: 1, y: 2 } and also return only plain objects and values.
// You can expect no side effects nor memories form previous calls.
//

exports.estimate = require('./estimate')

exports.estimators = require('./estimators')

exports.point = require('./point')

exports.transform = require('./transform')

exports.analysis = require('./analysis')

exports.tolerance = require('./tolerance')

// Contains the module version string identical to
// the version in *package.json*.
// This feature is powered by
// [genversion](https://github.com/axelpale/genversion).
//
//     > nudged.version
//     '2.3.4'
//
exports.version = require('./version')

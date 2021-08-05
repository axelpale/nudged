// Welcome to the Nudged interface documentation!
// The API follows a functional and immutable paradigm without classes.
// Thus all the functions take in and return only plain objects and values
// such as { x: 1, y: 2 }. The functions never modify the given objects,
// never cause side effects, and never memorize previous calls.
// In contrast to object-oriented programming, the features are
// implemented as pure functions that are grouped
// in modules aka namespaces instead of classes.
// See the available modules below.
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

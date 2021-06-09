// A point is a position in affine space.
// An affine space does not have origin: { x:0, y:0 } is not an origin.

// exports.add
// Points cannot be added because no origin.
// See .translate to add a vector.
//

exports.copy = require('./copy')

exports.create = require('./create')

exports.delta =
exports.difference = require('./difference')

exports.distance = require('./distance')

exports.equal = require('./equal')

// exports.magnitude
// Points cannot have magnitude because no origin to measure it.
//

// exports.max
// Points cannot have max because no origin to measure to.
//

exports.mean = require('./mean')

// exports.min
// Points cannot have min because no origin to measure to.

exports.move =
exports.translate = require('./translate')

// exports.norm = exports.magnitude
// Points cannot have norm because no origin to measure it.
//

// exports.opposite
// Points cannot have opposite because no origin to oppose to.
//

// exports.rotation
// Points cannot have rotation because no origin to rotate about.

const test = require('tape')
const almostEqual = require('../lib/transform').almostEqual

// Units
const version = require('./version')
const transform = require('./transform')
const estimators = require('./estimators')

// Custom assertations
test.Test.prototype.transformEqual = function (actual, expected, message) {
  this._assert(almostEqual(actual, expected), {
    message: message || 'transform should have correct elements',
    operator: 'transformEqual',
    actual: actual,
    expected: expected
  });
};

test('nudged', (t) => {
  t.test('nudged.version', version)
  t.test('nudged.transform', transform)
  t.test('nudged.estimators', estimators)
})

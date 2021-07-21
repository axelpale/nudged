const test = require('tape')
const nudged = require('../index')
const EPSILON = nudged.epsilon
const almostEqual = nudged.transform.almostEqual

// Units

const version = require('./version/index.test')
const transform = require('./transform/index.test')
const estimators = require('./estimators/index.test')
const epsilonTest = require('./epsilon/index.test')

// Custom assertations

test.Test.prototype.almostEqual = function (actual, expected, message) {
  const isAlmost = Math.abs(actual - expected) < EPSILON
  this._assert(isAlmost, {
    message: message || 'should be almost equal',
    operator: 'almostEqual',
    actual: actual,
    expected: expected
  })
}

test.Test.prototype.notAlmostEqual = function (actual, expected, message) {
  const isAlmost = Math.abs(actual - expected) < EPSILON
  this._assert(!isAlmost, {
    message: message || 'should not be almost equal',
    operator: 'notAlmostEqual',
    actual: actual,
    expected: 'not ' + expected
  })
}

test.Test.prototype.transformEqual = function (actual, expected, message) {
  this._assert(almostEqual(actual, expected), {
    message: message || 'transform should have correct elements',
    operator: 'transformEqual',
    actual: actual,
    expected: expected
  })
}

// Run test suite

test('nudged', (t) => {
  t.test('nudged.version', version)
  t.test('nudged.transform', transform)
  t.test('nudged.estimators', estimators)
  t.test('nudged.epsilon', epsilonTest)
})

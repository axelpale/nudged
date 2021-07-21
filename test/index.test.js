const test = require('tape')
const nudged = require('../index')
const EPSILON = nudged.epsilon
const almostEqual = nudged.transform.almostEqual

// Units

const versionTest = require('./version/index.test')
const epsilonTest = require('./epsilon/index.test')
const pointTest = require('./point/index.test')
const transformTest = require('./transform/index.test')
const estimatorsTest = require('./estimators/index.test')

// Custom assertations

test.Test.prototype.almostEqual = function (actual, expected, message) {
  // Test if a number is almost another number.
  const isAlmost = Math.abs(actual - expected) < EPSILON
  this._assert(isAlmost, {
    message: message || 'should be almost equal',
    operator: 'almostEqual',
    actual: actual,
    expected: expected
  })
}

test.Test.prototype.notAlmostEqual = function (actual, expected, message) {
  // Test if a number is not almost another number.
  const isAlmost = Math.abs(actual - expected) < EPSILON
  this._assert(!isAlmost, {
    message: message || 'should not be almost equal',
    operator: 'notAlmostEqual',
    actual: actual,
    expected: 'not ' + expected
  })
}

test.Test.prototype.transformEqual = function (actual, expected, message) {
  // Test if two transforms are almost the same.
  this._assert(almostEqual(actual, expected), {
    message: message || 'transform should have correct elements',
    operator: 'transformEqual',
    actual: actual,
    expected: expected
  })
}

// Run test suite

test('nudged', (t) => {
  t.test('nudged.version', versionTest)
  t.test('nudged.epsilon', epsilonTest)
  t.test('nudged.point', pointTest)
  t.test('nudged.transform', transformTest)
  t.test('nudged.estimators', estimatorsTest)
})

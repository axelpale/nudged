const test = require('tape')
const nudged = require('../index')
const TOLERANCE = nudged.tolerance

// Units

const versionTest = require('./version/index.test')
const toleranceTest = require('./tolerance/index.test')
const pointTest = require('./point/index.test')
const transformTest = require('./transform/index.test')
const estimatorsTest = require('./estimators/index.test')
const analysisTest = require('./analysis/index.test')

// Custom assertations

test.Test.prototype.almostEqual = function (actual, expected, message) {
  // Test if a number is almost another number.
  const isAlmost = Math.abs(actual - expected) < TOLERANCE
  this._assert(isAlmost, {
    message: message || 'should be almost equal',
    operator: 'almostEqual',
    actual: actual,
    expected: expected
  })
}

test.Test.prototype.notAlmostEqual = function (actual, expected, message) {
  // Test if a number is not almost another number.
  const isAlmost = Math.abs(actual - expected) < TOLERANCE
  this._assert(!isAlmost, {
    message: message || 'should not be almost equal',
    operator: 'notAlmostEqual',
    actual: actual,
    expected: 'not ' + expected
  })
}

test.Test.prototype.pointsAlmostEqual = function (actual, expected, message) {
  // Test if two points are almost the same.
  this._assert(nudged.point.almostEqual(actual, expected), {
    message: message || 'transform should have correct elements',
    operator: 'pointsAlmostEqual',
    actual: actual,
    expected: expected
  })
}

test.Test.prototype.transformEqual = function (actual, expected, message) {
  // Test if two transforms are almost the same.
  this._assert(nudged.transform.almostEqual(actual, expected), {
    message: message || 'transform should have correct elements',
    operator: 'transformEqual',
    actual: actual,
    expected: expected
  })
}

// Run test suite

test('nudged', (t) => {
  t.test('version', versionTest)
  t.test('tolerance', toleranceTest)
  t.test('point', pointTest)
  t.test('transform', transformTest)
  t.test('estimators', estimatorsTest)
  t.test('analysis', analysisTest)
})

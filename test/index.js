const test = require('tape')

// Units
const transform = require('./transform')
const version = require('./version')
const estimators = require('./estimators')

test('nudged', (t) => {
  t.test('version', version)
  t.test('transform', transform)
  t.test('nudged.estimators', estimators)
})

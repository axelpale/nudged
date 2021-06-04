const test = require('tape')

// Units
const version = require('./version')
const transform = require('./transform')
const estimators = require('./estimators')

test('nudged', (t) => {
  t.test('nudged.version', version)
  t.test('nudged.transform', transform)
  t.test('nudged.estimators', estimators)
})

const test = require('tape')

// Units
const transform = require('./transform')
const version = require('./version')

test('nudged', (t) => {
  t.test('version', version)
  t.test('transform', transform)
})

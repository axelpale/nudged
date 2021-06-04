const test = require('tape')
const pjson = require('../package.json')
const nudged = require('../index')

test('nudged.version', (t) => {
  t.equal(nudged.version, pjson.version, 'version match')
  t.end()
})

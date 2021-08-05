const pjson = require('../../package.json')
const nudged = require('../../index')

module.exports = (t) => {
  t.equal(nudged.version, pjson.version, 'version match')
  t.end()
}

// A unit for each method.
const create = require('./create')
const createFromPolar = require('./createFromPolar')

module.exports = (t) => {
  t.test('nudged.transform.create', create)
  t.test('nudged.transform.createFromPolar', createFromPolar)
}

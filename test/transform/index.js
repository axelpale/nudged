// A unit for each method.
const almostEqual = require('./almostEqual')
const create = require('./create')
const createFromArray = require('./createFromArray')
const createFromPolar = require('./createFromPolar')
const epsilon = require('./epsilon')
const equal = require('./equal')

module.exports = (t) => {
  t.test('nudged.transform.almostEqual', almostEqual)
  t.test('nudged.transform.create', create)
  t.test('nudged.transform.createFromArray', createFromArray)
  t.test('nudged.transform.createFromPolar', createFromPolar)
  t.test('nudged.transform.EPSILON', epsilon)
  t.test('nudged.transform.equal', equal)
}

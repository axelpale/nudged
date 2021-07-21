const nudged = require('../../index')
const point = nudged.point
const EPSILON = nudged.epsilon

module.exports = (ts) => {
  ts.test('case: various matches', (t) => {
    const a = { x: 1, y: 2 }
    const b = { x: 3, y: 4 }
    const c = { x: 1, y: 2 - EPSILON }

    t.notEqual(a, b, 'a is not b')
    t.notDeepEqual(a, b, 'a is not deeply equal to b')

    t.ok(point.equal(a, a), 'element-wise equal')
    t.notOk(point.equal(a, b), 'element-wise not equal')

    t.notOk(equal(a, c), 'values differ slightly')

    t.end()
  })
}

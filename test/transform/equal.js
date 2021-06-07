const nudged = require('../../index')
const equal = nudged.transform.equal

module.exports = (ts) => {
  ts.test('case: exact match', (t) => {
    const a = { a: 1, b: 2, x: 3, y: 4 }
    const b = { a: 1, b: 2, x: 3, y: 4 }
    const c = { a: 1 - Number.MIN_VALUE, b: 2, x: 3, y: 4 }
    t.notEqual(a, b, 'a is not b')
    t.deepEqual(a, b, 'a is identical to b')
    t.ok(equal(a, b), 'element-wise equal')
    t.notOk(equal(a, c), 'epsilon^2 larger than MIN_VALUE')

    t.end()
  })
}

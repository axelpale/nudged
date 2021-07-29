const title = 'transform.equal: '
const nudged = require('../../index')
const equal = nudged.transform.equal
const TOLERANCE = nudged.tolerance

module.exports = (ts) => {
  ts.test(title + 'various matches', (t) => {
    const a = { a: 1, b: 2, x: 3, y: 4 }
    const b = { a: 1, b: 2, x: 3, y: 4 }
    const c = { a: 1, b: 0, x: 0, y: 0 }
    const d = { a: 1 - TOLERANCE, b: 2, x: 3, y: 4 }
    t.notEqual(a, b, 'a is not b')
    t.deepEqual(a, b, 'a is identical to b')
    t.ok(equal(a, b), 'element-wise equal')
    t.notOk(equal(a, c), 'values differ greatly')
    t.notOk(equal(a, d), 'values differ slightly')

    t.end()
  })
}

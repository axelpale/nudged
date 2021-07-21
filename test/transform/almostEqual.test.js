const nudged = require('../../index')
const almostEqual = nudged.transform.almostEqual
const EPSILON = nudged.epsilon

module.exports = (ts) => {
  ts.test('case: various matches', (t) => {
    const a = { a: 1, b: 2, x: 3, y: 4 }
    const b = { a: 1, b: 2, x: 3, y: 4 }
    const c = { a: 1, b: 0, x: 0, y: 0 }
    const d = { a: 1 - EPSILON * 2, b: 2, x: 3, y: 4 }
    const e = { a: 1 - EPSILON ** 2, b: 2, x: 3, y: 4 }

    t.true(almostEqual(a, a), 'same object')
    t.true(almostEqual(a, b), 'element-wise equal')
    t.false(almostEqual(a, c), 'values differ greatly')
    t.false(almostEqual(a, d), 'values differ slightly')
    t.true(almostEqual(a, e), 'values differ very slightly')

    t.end()
  })
}

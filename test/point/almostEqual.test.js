const nudged = require('../../index')
const almostEqual = nudged.point.almostEqual
const EPSILON = nudged.epsilon
const title = 'point.almostEqual: '

module.exports = (ts) => {
  ts.test(title + 'various matches', (t) => {
    const a = { x: 1, y: 2 }
    const b = { x: 1, y: 2, z: 3 }
    const c = { x: 3, y: 4 }
    const d = { x: 1 - EPSILON * 2, y: 2 }
    const e = { x: 1 - EPSILON ** 2, y: 2 }

    t.true(almostEqual(a, a), 'same object')
    t.true(almostEqual(a, b), 'element-wise equal')
    t.false(almostEqual(a, c), 'values differ greatly')
    t.false(almostEqual(a, d), 'values differ slightly')
    t.true(almostEqual(a, e), 'values differ very slightly')

    t.end()
  })
}

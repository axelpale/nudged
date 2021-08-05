const title = 'point.equal: '
const nudged = require('../../index')
const point = nudged.point
const TOLERANCE = nudged.tolerance

module.exports = (ts) => {
  ts.test(title + 'various matches', (t) => {
    const a = { x: 1, y: 2 }
    const b = { x: 3, y: 4 }
    const c = { x: 1, y: 2 - TOLERANCE }

    t.notEqual(a, b, 'a is not b')
    t.notDeepEqual(a, b, 'a is not deeply equal to b')

    t.ok(point.equal(a, a), 'element-wise equal')
    t.notOk(point.equal(a, b), 'element-wise not equal')

    t.notOk(point.equal(a, c), 'values differ slightly')

    t.end()
  })
}

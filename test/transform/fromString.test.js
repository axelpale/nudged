const title = 'transform.fromString: '
const nudged = require('../../index')
const fromString = nudged.transform.fromString

module.exports = (ts) => {
  ts.test(title + 'drop m21 and m22', (t) => {
    t.deepEqual(fromString('matrix(1, 2, 666, 666, 3, 4)'), {
      a: 1,
      b: 2,
      x: 3,
      y: 4
    })

    t.end()
  })

  ts.test(title + 'compatible with toString', (t) => {
    const tr = nudged.transform.fromRotation({ x: 4, y: 2 }, Math.PI / 5)
    const trStr = nudged.transform.toString(tr)
    const ts = fromString(trStr)

    // NOT equal because toFixed
    t.notTransformsEqual(tr, ts)

    const tsStr = nudged.transform.toString(ts)
    const ts2 = fromString(tsStr)

    // Now same decimals
    t.transformsEqual(ts2, ts)

    t.end()
  })
}

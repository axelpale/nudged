const title = 'transform.fromTranslation: '
const nudged = require('../../index')
const IDENTITY = nudged.transform.IDENTITY
const fromTranslation = nudged.transform.fromTranslation // unit

module.exports = (ts) => {
  ts.test(title + 'basic', (t) => {
    const tr = fromTranslation({ x: 4, y: 2 })
    const p = nudged.point.transform({ x: 2, y: 1 }, tr)
    t.deepEqual(p, {
      x: 6,
      y: 3
    })

    t.end()
  })

  ts.test(title + 'zero translation', (t) => {
    t.transformsEqual(fromTranslation({ x: 0, y: 0 }), IDENTITY)

    t.end()
  })
}

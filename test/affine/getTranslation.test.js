const nudged = require('../../index')
const getTranslation = nudged.transform.getTranslation

module.exports = (ts) => {
  ts.test('case: basic', (t) => {
    const tr = { a: 1, b: 2, x: 3, y: 4 }
    t.deepEqual(getTranslation(tr), {
      x: 3,
      y: 4
    })

    t.end()
  })
}

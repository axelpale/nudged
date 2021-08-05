const title = 'analysis.mse: '
const analysis = require('../../lib/analysis')

module.exports = (ts) => {
  ts.test(title + 'basic usage', (t) => {
    const dom = [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }]
    const ran = [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 3, y: 2 }]
    const translation = { a: 1, b: 0, x: 1, y: 0 }
    // residuals [1, 1, 2]

    t.deepEqual(
      analysis.mse(translation, dom, ran),
      2, // (1 + 1 + 4) / 3
      '(1 + 1 + 4) / 3'
    )

    t.end()
  })
}

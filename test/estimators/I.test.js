const title = 'transform.IDENTITY: '
const nudged = require('../../index')
const unit = nudged.estimators.I
const IDENTITY = nudged.transform.IDENTITY

module.exports = (ts) => {
  ts.test(title + 'happy', (t) => {
    t.deepEqual(unit(), IDENTITY)

    t.end()
  })

  ts.test(title + 'no effect from params', (t) => {
    const domain = [{ x: 0, y: 0 }]
    const range = [{ x: 5, y: 5 }]
    t.deepEqual(unit(domain, range), IDENTITY)

    t.deepEqual(unit(['a', 'b'], ['foo', 4, 'bar']), IDENTITY)

    t.end()
  })
}

const nudged = require('../../index')
const getScale = nudged.transform.getScale
const transform = nudged.transform

module.exports = (ts) => {
  ts.test('case: basic scalings', (t) => {
    t.equal(getScale(transform.IDENTITY), 1)
    t.equal(getScale(transform.HALF), 0.5)
    t.equal(getScale(transform.X2), 2)

    t.end()
  })

  ts.test('case: scaled', (t) => {
    const x5 = transform.scale(transform.ROT90, { x: 0, y: 0}, 5)
    t.equal(getScale(x5), 5, 'from origin')

    const xx5 = transform.scale(transform.ROT45, { x: 100, y: -100}, 5)
    t.equal(getScale(xx5), 5, 'far from origin')

    t.end()
  })
}

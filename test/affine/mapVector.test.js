const transform = require('../../index').transform
const mapVector = transform.mapVector

module.exports = (ts) => {
  ts.test('case: various mappings', (t) => {
    const vec = { dx: 1, dy: -1 }

    t.deepEqual(
      mapVector(transform.ROT180, vec),
      { dx: -1, dy: 1 }
    )

    // rotation with translation
    const tr = transform.translateBy(transform.ROT45, { dx: 10, dy: 10 })
    t.deepEqual(
      mapVector(tr, vec),
      mapVector(transform.ROT45, vec),
      'translation should not affect'
    )

    t.end()
  })
}

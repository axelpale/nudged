const nudged = require('../../index')
const estimate = nudged.estimators.T
const title = 'estimators.T: '

module.exports = (ts) => {
  ts.test(title + 'basic', (t) => {
    t.deepEqual(
      estimate(
        [{ x: 0, y: 0 }],
        [{ x: -1, y: 1 }]
      ),
      { a: 1, b: 0, x: -1, y: 1 },
      'simple translation'
    )

    t.deepEqual(
      estimate(
        [{ x: 1, y: 1 }, { x: 2, y: 2 }],
        [{ x: 2, y: 2 }, { x: 3, y: 4 }]
      ),
      { a: 1, b: 0, x: 1, y: 1.5 },
      'mean translation'
    )

    t.end()
  })

  ts.test(title + 'ignore additional points', (t) => {
    t.deepEqual(
      estimate(
        [{ x: 0, y: 0 }, { x: 666, y: 666 }],
        [{ x: -1, y: 1 }]
      ),
      { a: 1, b: 0, x: -1, y: 1 },
      'ignore extra domain'
    )

    t.deepEqual(
      estimate(
        [{ x: 0, y: 0 }],
        [{ x: -1, y: 1 }, { x: 666, y: 666 }]
      ),
      { a: 1, b: 0, x: -1, y: 1 },
      'ignore extra range'
    )

    t.deepEqual(
      estimate([], []),
      { a: 1, b: 0, x: 0, y: 0 },
      'allow empty'
    )

    t.end()
  })
}

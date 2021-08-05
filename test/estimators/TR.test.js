const title = 'estimators.TR: '
const nudged = require('../../index')
const estimateTR = nudged.estimators.TR
const IDENTITY = nudged.transform.IDENTITY

module.exports = (ts) => {
  ts.test(title + 'basic usage with the general estimator', (t) => {
    const tr = nudged.estimate({
      estimator: 'TR',
      domain: [{ x: 1, y: 0 }, { x: 3, y: 0 }],
      range: [{ x: 4, y: 0 }, { x: 4, y: 2 }]
    })
    const expected = nudged.transform.translateBy(
      nudged.transform.fromRotation({ x: 0, y: 0 }, Math.PI / 2),
      { x: 4, y: -1 }
    )
    t.transformsEqual(tr, expected, 'allow TR group')

    t.end()
  })

  ts.test(title + 'trivial point sets', (t) => {
    t.transformsEqual(
      estimateTR([], []),
      IDENTITY,
      'empty domain and range'
    )

    t.transformsEqual(
      estimateTR(
        [{ x: 0, y: 0 }],
        [{ x: 0, y: 0 }]
      ),
      IDENTITY,
      'domain and range equal'
    )

    t.end()
  })

  ts.test(title + 'only scale', (t) => {
    t.transformsEqual(
      estimateTR(
        [{ x: 1, y: 0 }, { x: -1, y: 0 }],
        [{ x: 2, y: 0 }, { x: -2, y: 0 }]
      ),
      IDENTITY,
      'ignore scale x2'
    )

    t.end()
  })

  ts.test(title + 'multiple points', (t) => {
    t.transformsEqual(
      estimateTR(
        [{ x: 0, y: 0 }, { x: 4, y: 0 }],
        [{ x: 4, y: 0 }, { x: 4, y: 2 }]
      ),
      { a: 0, b: 1, x: 4, y: -1 },
      'positive 90 deg and match mean'
    )

    t.end()
  })

  ts.test(title + 'multiple identical points', (t) => {
    t.transformsEqual(
      estimateTR(
        [{ x: 0, y: 0 }, { x: 0, y: 0 }],
        [{ x: 4, y: 0 }, { x: 4, y: 0 }]
      ),
      { a: 1, b: 0, x: 4, y: 0 },
      'translation only'
    )

    t.end()
  })

  ts.test(title + 'detect missing params', (t) => {
    t.throws(() => {
      estimateTR([])
    }, 'missing range')

    t.end()
  })

  ts.test(title + 'almost zero determinant', (t) => {
    // This domain and range pair caused D to become almost zero
    // but not zero. After proper 'D < tolerance' instead of 'D === 0'
    // the issue should be repaired.
    const dom = [{ x: 0.212556732223903, y: 0.202823146747352 }]
    const ran = [{ x: 0.208018154311649, y: 0.198184568835098 }]
    const tr = estimateTR(dom, ran)

    t.equal(nudged.transform.getScale(tr), 1)
    t.equal(nudged.transform.getRotation(tr), 0)

    t.end()
  })
}

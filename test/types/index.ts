import * as nudged from 'nudged'

//// EstimatorParams

// @ts-expect-error
nudged.estimate({ foo: 'bar' })

nudged.estimate({
  estimator: 'T',
  domain: [],
  range: []
})

//// Estimators

// Allow empty trivial estimator.
nudged.estimators.I()

// Do not allow empty non-trivial estimator.
// @ts-expect-error
nudged.estimators.TR()

//// Point

// @ts-expect-error
nudged.point.equal({ x: 2, y: 1}, { y: 0 })

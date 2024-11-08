// Test that the type declarations actually work.
// Usage: Use tsc to compile this file with a tsconfig.json that has 'paths' for 'nudged' package.
// Project: nudged
//
import * as nudged from 'nudged'

//// Analysis

// @ts-expect-error
nudged.analysis.mse('foo', 'bar', 'baz') // invalid params

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

// Detect bad point
// @ts-expect-error
nudged.estimators.TSR([{ x: 1, y: 1 }, { x: 1 }], [{ x: 1, y: 1 }, { x: 2, y: 2 }])

//// Point

// @ts-expect-error
nudged.point.distance({ x: 1, y: 1 }, { x: 0, y: 1 }, { x: 0, y: 1 }) // too many params
// @ts-expect-error
nudged.point.equal({ x: 2, y: 1}, { y: 0 }) // missing x

//// Tolerance

const t : number = nudged.tolerance // save for later
// @ts-expect-error
nudged.tolerance = 'foo' // test that cannot be set
// @ts-expect-error 
nudged.tolerance = t // put back for next cases

//// Transform

// @ts-expect-error
nudged.transform.getScale() // missing param

//// Version

const n : string = nudged.version
// @ts-expect-error
nudged.version = '1.2.3' // read only

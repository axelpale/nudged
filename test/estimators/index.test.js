// Sub-units for each estimator.
const testI = require('./I.test')
const testL = require('./L.test')
const testX = require('./X.test')
const testT = require('./T.test')

module.exports = (t) => {
  t.test('estimators.I', testI)
  t.test('estimators.L', testL)
  t.test('estimators.X', testX)
  t.test('estimators.T', testT)
}

// var samples = {
//   // Info about the properties
//   //   id: description
//   //   a: domain
//   //   b: range
//   //   fixed: a fixed pivot point used in applicable estimations
//   //   t: result of translation estimation
//   //   ts: result of translation scaling estimation
//   //   fsr: result of scaling rotation estimation with a specified fixed pivot.
//   'z-00': {
//     id: 'should allow arrays of length zero',
//     a: [],
//     b: [],
//     t: IDENTITY,
//     s: IDENTITY,
//     fs: IDENTITY,
//     r: IDENTITY,
//     fr: IDENTITY,
//     ts: IDENTITY,
//     tr: IDENTITY,
//     sr: IDENTITY,
//     fsr: IDENTITY,
//     tsr: IDENTITY
//   },
//   't-00': {
//     id: 'Simple translation',
//     a: [[0, 0], [0, 1]],
//     b: [[1, 1], [1, 2]],
//     t: { s: 1, r: 0, tx: 1, ty: 1 },
//     ts: { s: 1, r: 0, tx: 1, ty: 1 },
//     tr: { s: 1, r: 0, tx: 1, ty: 1 },
//     tsr: { s: 1, r: 0, tx: 1, ty: 1 }
//   },
//   't-01': {
//     id: 'should allow arrays with singleton domain and range',
//     a: [[1, 1]],
//     b: [[5, 5]],
//     t: { s: 1, r: 0, tx: 4, ty: 4 },
//     ts: { s: 1, r: 0, tx: 4, ty: 4 },
//     tr: { s: 1, r: 0, tx: 4, ty: 4 },
//     tsr: { s: 1, r: 0, tx: 4, ty: 4 }
//   },
//   't-02': {
//     id: 'should allow arrays of identical points',
//     a: [[1, 1], [1, 1]],
//     b: [[5, 5], [7, 7]],
//     t: { s: 1, r: 0, tx: 5, ty: 5 },
//     s: { s: 6, r: 0, tx: 0, ty: 0 },
//     ts: { s: 1, r: 0, tx: 5, ty: 5 },
//     tr: { s: 1, r: 0, tx: 5, ty: 5 },
//     tsr: { s: 1, r: 0, tx: 5, ty: 5 }
//   },
//   's-00': {
//     id: 'Simple scaling',
//     a: [[1, 1], [-1, -1]],
//     b: [[2, 2], [-2, -2]],
//     tsr: { s: 2, r: 0, tx: 0, ty: 0 },
//     s: { s: 2, r: 0, tx: 0, ty: 0 }
//   },
//   'r-00': {
//     id: 'Simple rotation',
//     a: [[1, 1], [-1, -1]],
//     b: [[-1, -1], [1, 1]],
//     r: { s: -1, r: 0, tx: 0, ty: 0 },
//     tsr: { s: -1, r: 0, tx: 0, ty: 0 }
//   },
//   'sr-00': {
//     id: 'Simple scaling & rotation',
//     a: [[1, 1], [-1, -1]],
//     b: [[-2, -2], [2, 2]],
//     fixed: [1, 1],
//     s: { s: 0, r: 0, tx: 0, ty: 0 },
//     r: { s: -1, r: 0, tx: 0, ty: 0 },
//     fr: { s: -1, r: 0, tx: 2, ty: 2 },
//     sr: { s: -2, r: 0, tx: 0, ty: 0 },
//     tsr: { s: -2, r: 0, tx: 0, ty: 0 }
//   },
//   'sr-01': {
//     id: 'Scaling and rotating a square',
//     a: [[1, 1], [2, 1], [2, 2], [1, 2]],
//     b: [[1, 1], [2, 2], [1, 3], [0, 2]],
//     fixed: [1, 1],
//     tsr: { s: 1, r: 1, tx: 1, ty: -1 },
//     fsr: { s: 1, r: 1, tx: 1, ty: -1 }
//   },
//   'sr-02': {
//     id: 'should allow domain under pivot',
//     a: [[1, 1], [1, 1]],
//     b: [[2, 2], [2, 2]],
//     fixed: [1, 1],
//     fsr: IDENTITY
//   },
//   'ts-00': {
//     id: 'Simple translation & scaling',
//     a: [[1, 1], [2, 1], [2, 2], [1, 2]],
//     b: [[-2, -2], [0, -2], [0, 0], [-2, 0]],
//     tsr: { s: 2, r: 0, tx: -4, ty: -4 },
//     t: { s: 1, r: 0, tx: -2.5, ty: -2.5 },
//     s: { s: 0, r: 0, tx: 0, ty: 0 },
//     fixed: [2, 2],
//     fs: { s: 4, r: 0, tx: -6, ty: -6 },
//     ts: { s: 2, r: 0, tx: -4, ty: -4 }
//   },
//   'tr-00': {
//     id: 'Simple translation & rotation',
//     a: [[0, 0], [2, 0], [1, 2]],
//     b: [[1, 1], [1, 3], [-1, 2]],
//     tr: { s: 0, r: 1, tx: 1, ty: 1 },
//     tsr: { s: 0, r: 1, tx: 1, ty: 1 }
//   },
//   'tsr-00': {
//     id: 'Simple translation, scaling, & rotation',
//     a: [[1, -1], [3, -2]],
//     b: [[3, 4], [10, 8]],
//     tsr: { s: 2, r: 3, tx: -2, ty: 3 }
//   },
//   'tsr-01': {
//     id: 'Should allow different domain and range lengths',
//     a: [[1, -1], [3, -2], [1, 2]],
//     b: [[3, 4], [10, 8]],
//     tsr: { s: 2, r: 3, tx: -2, ty: 3 }
//   },
//   'ts-01': {
//     id: 'Approximating non-uniform scaling',
//     a: [[0, 0], [2, 0], [0, 2], [2, 2]],
//     b: [[0, 0], [2, 0], [0, 4], [2, 4]],
//     tsr: { s: 1.5, r: 0, tx: -0.5, ty: 0.5 }
//   },
//   'c-00': {
//     id: 'Constant transformation',
//     a: [[0, 0], [2, 0], [0, 2]],
//     b: [[1, 1], [1, 1], [1, 1]],
//     tsr: { s: 0.0, r: 0.0, tx: 1.0, ty: 1.0 }
//   }
// }

// var pickSamples = function (type) {
//   return _.pick(samples, function (s) {
//     return type in s
//   })
// }

// var forSamples = function (type, iteratee) {
//   // Usage:
//   //   forSamples('sr', function (sample, samkey) { ... })
//   var S = pickSamples(type)
//   _.forOwn(S, iteratee)
// }

// var assertTransform = function (t1, t2, msg) {
//   if (typeof msg === 'undefined') {
//     msg = ''
//   } else {
//     msg = ' of ' + msg
//   }
//   var tolerance = 0.00001
//   try {
//     t1.s.should.be.approximately(t2.s, tolerance, 's' + msg)
//     t1.r.should.be.approximately(t2.r, tolerance, 'r' + msg)
//     t1.tx.should.be.approximately(t2.tx, tolerance, 'tx' + msg)
//     t1.ty.should.be.approximately(t2.ty, tolerance, 'ty' + msg)
//   } catch (assertionError) {
//     console.log(t1)
//     console.log(t2)
//     throw assertionError
//   }
// }

// var assertIdentity = function (transform) {
//   should.ok(transform.equals(IDENTITY))
// }

// describe('.estimate', function () {
//    it('should estimate correct transformation type', function () {
//      forSamples('sr', function (sam, samkey) {
//        var t = nudged.estimate('sr', sam.a, sam.b)
//        assertTransform(t, sam.tsr, samkey)
//      })
//    })

//    it('should throw if unknown type', function () {
//      (function () {
//        nudged.estimate('RST', [1, 1], [2, 2])
//      }).should.throw(/estimator type/)
//    })
//  })

//  describe('.estimateI', function () {
//    it('should return identity', function () {
//      // Does not process arguments after the first
//      var t = nudged.estimate('I', ['a', 'b'], ['c', 'd', 'efoo'])
//      t.should.equal(IDENTITY)
//    })
//  })

//  describe('.estimateL', function () {
//    it('should estimate line translation correctly', function () {
//      var t = nudged.estimate('L', [], [])
//      t.should.equal(IDENTITY)

//      t = nudged.estimateL([[0, 0]], [[1, 0]], 0)
//      assertTransform(t, { s: 1, r: 0, tx: 1, ty: 0 })

//      t = nudged.estimateL([[0, 0]], [[1, 0]], Math.PI / 2)
//      assertTransform(t, IDENTITY)

//      // 5/8 turn, should be equivalent to 1/8 turn.
//      var t1 = nudged.estimateL([[-2, -2]], [[1, 5]], Math.PI / 4)
//      var t2 = nudged.estimateL([[-2, -2]], [[1, 5]], 5 * Math.PI / 4)
//      assertTransform(t1, t2)
//    })
//    it('should estimate with multiple points', function () {
//      // Points go up, but line goes 45 deg.
//      var t = nudged.estimate('L', [[1, 1], [2, 0]], [[1, 2], [2, 1]], Math.PI / 4)
//      assertTransform(t, { s: 1, r: 0, tx: 0.5, ty: 0.5 })
//    })
//  })

//  describe('.estimateX', function () {
//    it('should estimate horizontal translation correctly', function () {
//      var t = nudged.estimate('X', [], [])
//      t.should.equal(IDENTITY)

//      t = nudged.estimateX([[0, 0]], [[1, 0]])
//      assertTransform(t, { s: 1, r: 0, tx: 1, ty: 0 })
//      t = nudged.estimateX([[0, 0]], [[0, 1]])
//      assertTransform(t, { s: 1, r: 0, tx: 0, ty: 0 })
//    })
//    it('should estimate with multiple points', function () {
//      // Points go +1 -1.
//      var t = nudged.estimate('X', [[1, 1], [2, 0]], [[2, 0], [3, -1]])
//      assertTransform(t, { s: 1, r: 0, tx: 1, ty: 0 })
//    })
//  })

//  describe('.estimateY', function () {
//    it('should estimate vertical translation correctly', function () {
//      var t = nudged.estimate('Y', [], [])
//      t.should.equal(IDENTITY)

//      t = nudged.estimateY([[0, 0]], [[1, 0]])
//      assertTransform(t, { s: 1, r: 0, tx: 0, ty: 0 })
//      t = nudged.estimateY([[0, 0]], [[0, 1]])
//      assertTransform(t, { s: 1, r: 0, tx: 0, ty: 1 })
//    })
//    it('should estimate with multiple points', function () {
//      // Points go +1 -1.
//      var t = nudged.estimate('Y', [[1, 1], [2, 0]], [[2, 0], [3, -1]])
//      assertTransform(t, { s: 1, r: 0, tx: 0, ty: -1 })
//    })
//  })

//  describe('.estimateTSR', function () {
//    it('should estimate correctly', function () {
//      forSamples('tsr', function (sam, samkey) {
//        var transform = nudged.estimateTSR(sam.a, sam.b)
//        assertTransform(transform, sam.tsr, samkey)
//      })
//    })
//  })

//  describe('.estimateT', function () {
//    it('should estimate correctly', function () {
//      forSamples('t', function (sam, samkey) {
//        var t = nudged.estimate('T', sam.a, sam.b)
//        assertTransform(t, sam.t, samkey)
//      })
//    })
//  })

//  describe('.estimateS', function () {
//    it('should estimate correctly', function () {
//      forSamples('s', function (sam, samkey) {
//        var t = nudged.estimateS(sam.a, sam.b)
//        assertTransform(t, sam.s, samkey)
//      })
//    })
//    it('should estimate fixed situation correctly', function () {
//      forSamples('fs', function (sam, samkey) {
//        var t = nudged.estimateS(sam.a, sam.b, sam.fixed)
//        assertTransform(t, sam.fs, samkey)
//      })
//    })
//  })

//  describe('.estimateR', function () {
//    it('should estimate correctly', function () {
//      forSamples('r', function (sam, samkey) {
//        var transform = nudged.estimateR(sam.a, sam.b)
//        assertTransform(transform, sam.r, samkey)
//      })
//    })
//    it('should estimate fixed situation correctly', function () {
//      forSamples('fr', function (sam, samkey) {
//        var t = nudged.estimate('R', sam.a, sam.b, sam.fixed)
//        assertTransform(t, sam.fr, samkey)
//      })
//    })
//  })

//  describe('.estimateTS', function () {
//    it('should estimate correctly', function () {
//      forSamples('ts', function (sam, samkey) {
//        var t = nudged.estimateTS(sam.a, sam.b)
//        assertTransform(t, sam.ts, samkey)
//      })
//    })
//  })

//  describe('.estimateTR', function () {
//    it('should estimate correctly', function () {
//      forSamples('tr', function (sam, samkey) {
//        var t = nudged.estimateTR(sam.a, sam.b)
//        assertTransform(t, sam.tr, samkey)
//      })
//    })

//    it('should not rotate when singular domain', function () {
//      // This domain and range pair caused D to become almost zero
//      // but not zero. After proper 'D < epsilon' instead of 'D === 0'
//      // the issue should be repaired.
//      var dom = [[0.21255673222390348, 0.20282314674735248]]
//      var ran = [[0.20801815431164927, 0.19818456883509827]]
//      var tr = nudged.estimateTR(dom, ran)
//      tr.getScale().should.equal(1)
//      tr.getRotation().should.equal(0)
//    })
//  })

//  describe('.estimateSR', function () {
//    it('should estimate correctly', function () {
//      forSamples('sr', function (sam, samkey) {
//        var t = nudged.estimateSR(sam.a, sam.b)
//        assertTransform(t, sam.sr, samkey)
//      })
//    })
//    it('should estimate fixed situation correctly', function () {
//      forSamples('fsr', function (sam, samkey) {
//        var t = nudged.estimate('SR', sam.a, sam.b, sam.fixed)
//        assertTransform(t, sam.fsr, samkey)
//      })
//    })
//  })

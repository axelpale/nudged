/* global it, describe, beforeEach */
var should = require('should')
var _ = require('lodash')
var pjson = require('../package.json')
var pi = Math.PI
var epsilon = 0.000000000000001

// The unit
var nudged = require('../index')
var IDENTITY = nudged.Transform.IDENTITY

var samples = {
  // Info about the properties
  //   id: description
  //   a: domain
  //   b: range
  //   fixed: a fixed pivot point used in applicable estimations
  //   t: result of translation estimation
  //   ts: result of translation scaling estimation
  //   fsr: result of scaling rotation estimation with a specified fixed pivot.
  'z-00': {
    id: 'should allow arrays of length zero',
    a: [],
    b: [],
    t: IDENTITY,
    s: IDENTITY,
    fs: IDENTITY,
    r: IDENTITY,
    fr: IDENTITY,
    ts: IDENTITY,
    tr: IDENTITY,
    sr: IDENTITY,
    fsr: IDENTITY,
    tsr: IDENTITY
  },
  't-00': {
    id: 'Simple translation',
    a: [[0, 0], [0, 1]],
    b: [[1, 1], [1, 2]],
    t: { s: 1, r: 0, tx: 1, ty: 1 },
    ts: { s: 1, r: 0, tx: 1, ty: 1 },
    tr: { s: 1, r: 0, tx: 1, ty: 1 },
    tsr: { s: 1, r: 0, tx: 1, ty: 1 }
  },
  't-01': {
    id: 'should allow arrays with singleton domain and range',
    a: [[1, 1]],
    b: [[5, 5]],
    t: { s: 1, r: 0, tx: 4, ty: 4 },
    ts: { s: 1, r: 0, tx: 4, ty: 4 },
    tr: { s: 1, r: 0, tx: 4, ty: 4 },
    tsr: { s: 1, r: 0, tx: 4, ty: 4 }
  },
  't-02': {
    id: 'should allow arrays of identical points',
    a: [[1, 1], [1, 1]],
    b: [[5, 5], [7, 7]],
    t: { s: 1, r: 0, tx: 5, ty: 5 },
    s: { s: 6, r: 0, tx: 0, ty: 0 },
    ts: { s: 1, r: 0, tx: 5, ty: 5 },
    tr: { s: 1, r: 0, tx: 5, ty: 5 },
    tsr: { s: 1, r: 0, tx: 5, ty: 5 }
  },
  's-00': {
    id: 'Simple scaling',
    a: [[1, 1], [-1, -1]],
    b: [[2, 2], [-2, -2]],
    tsr: { s: 2, r: 0, tx: 0, ty: 0 },
    s: { s: 2, r: 0, tx: 0, ty: 0 }
  },
  'r-00': {
    id: 'Simple rotation',
    a: [[1, 1], [-1, -1]],
    b: [[-1, -1], [1, 1]],
    r: { s: -1, r: 0, tx: 0, ty: 0 },
    tsr: { s: -1, r: 0, tx: 0, ty: 0 }
  },
  'sr-00': {
    id: 'Simple scaling & rotation',
    a: [[1, 1], [-1, -1]],
    b: [[-2, -2], [2, 2]],
    fixed: [1, 1],
    s: { s: 0, r: 0, tx: 0, ty: 0 },
    r: { s: -1, r: 0, tx: 0, ty: 0 },
    fr: { s: -1, r: 0, tx: 2, ty: 2 },
    sr: { s: -2, r: 0, tx: 0, ty: 0 },
    tsr: { s: -2, r: 0, tx: 0, ty: 0 }
  },
  'sr-01': {
    id: 'Scaling and rotating a square',
    a: [[1, 1], [2, 1], [2, 2], [1, 2]],
    b: [[1, 1], [2, 2], [1, 3], [0, 2]],
    fixed: [1, 1],
    tsr: { s: 1, r: 1, tx: 1, ty: -1 },
    fsr: { s: 1, r: 1, tx: 1, ty: -1 }
  },
  'sr-02': {
    id: 'should allow domain under pivot',
    a: [[1, 1], [1, 1]],
    b: [[2, 2], [2, 2]],
    fixed: [1, 1],
    fsr: IDENTITY
  },
  'ts-00': {
    id: 'Simple translation & scaling',
    a: [[1, 1], [2, 1], [2, 2], [1, 2]],
    b: [[-2, -2], [0, -2], [0, 0], [-2, 0]],
    tsr: { s: 2, r: 0, tx: -4, ty: -4 },
    t: { s: 1, r: 0, tx: -2.5, ty: -2.5 },
    s: { s: 0, r: 0, tx: 0, ty: 0 },
    fixed: [2, 2],
    fs: { s: 4, r: 0, tx: -6, ty: -6 },
    ts: { s: 2, r: 0, tx: -4, ty: -4 }
  },
  'tr-00': {
    id: 'Simple translation & rotation',
    a: [[0, 0], [2, 0], [1, 2]],
    b: [[1, 1], [1, 3], [-1, 2]],
    tr: { s: 0, r: 1, tx: 1, ty: 1 },
    tsr: { s: 0, r: 1, tx: 1, ty: 1 }
  },
  'tsr-00': {
    id: 'Simple translation, scaling, & rotation',
    a: [[1, -1], [3, -2]],
    b: [[3, 4], [10, 8]],
    tsr: { s: 2, r: 3, tx: -2, ty: 3 }
  },
  'tsr-01': {
    id: 'Should allow different domain and range lengths',
    a: [[1, -1], [3, -2], [1, 2]],
    b: [[3, 4], [10, 8]],
    tsr: { s: 2, r: 3, tx: -2, ty: 3 }
  },
  'ts-01': {
    id: 'Approximating non-uniform scaling',
    a: [[0, 0], [2, 0], [0, 2], [2, 2]],
    b: [[0, 0], [2, 0], [0, 4], [2, 4]],
    tsr: { s: 1.5, r: 0, tx: -0.5, ty: 0.5 }
  },
  'c-00': {
    id: 'Constant transformation',
    a: [[0, 0], [2, 0], [0, 2]],
    b: [[1, 1], [1, 1], [1, 1]],
    tsr: { s: 0.0, r: 0.0, tx: 1.0, ty: 1.0 }
  }
}

var pickSamples = function (type) {
  return _.pick(samples, function (s) {
    return type in s
  })
}

var forSamples = function (type, iteratee) {
  // Usage:
  //   forSamples('sr', function (sample, samkey) { ... })
  var S = pickSamples(type)
  _.forOwn(S, iteratee)
}

var assertTransform = function (t1, t2, msg) {
  if (typeof msg === 'undefined') {
    msg = ''
  } else {
    msg = ' of ' + msg
  }
  var tolerance = 0.00001
  try {
    t1.s.should.be.approximately(t2.s, tolerance, 's' + msg)
    t1.r.should.be.approximately(t2.r, tolerance, 'r' + msg)
    t1.tx.should.be.approximately(t2.tx, tolerance, 'tx' + msg)
    t1.ty.should.be.approximately(t2.ty, tolerance, 'ty' + msg)
  } catch (assertionError) {
    console.log(t1)
    console.log(t2)
    throw assertionError
  }
}

var assertIdentity = function (transform) {
  should.ok(transform.equals(IDENTITY))
}

describe('nudged', function () {
  it('should have version that match package', function () {
    nudged.version.should.equal(pjson.version)
  })

  describe('.create', function () {
    it('should be able to create identity', function () {
      var t = nudged.create(1, 0, 0, 0)
      assertIdentity(t)
    })

    it('should default to identity', function () {
      assertIdentity(nudged.create())
    })

    it('should be consistent with previous methods', function () {
      var a = nudged.create(2.0, 3, 1, 2)
      var b = nudged.Transform.IDENTITY
        .scaleBy(2)
        .rotateBy(3)
        .translateBy(1, 2)
      assertTransform(a, b)
    })
  })

  describe('.createFromArray', function () {
    it('should work with toArray', function () {
      var t1 = nudged.create(0.4, 2.2, 10, 10)
      var arr = t1.toArray()
      var t2 = nudged.createFromArray(arr)
      assertTransform(t1, t2)
    })
  })

  describe('.estimate', function () {
    it('should estimate correct transformation type', function () {
      forSamples('sr', function (sam, samkey) {
        var t = nudged.estimate('sr', sam.a, sam.b)
        assertTransform(t, sam.tsr, samkey)
      })
    })

    it('should throw if unknown type', function () {
      (function () {
        nudged.estimate('RST', [1, 1], [2, 2])
      }).should.throw(/estimator type/)
    })
  })

  describe('.estimateI', function () {
    it('should return identity', function () {
      // Does not process arguments after the first
      var t = nudged.estimate('I', ['a', 'b'], ['c', 'd', 'efoo'])
      t.should.equal(IDENTITY)
    })
  })

  describe('.estimateL', function () {
    it('should estimate line translation correctly', function () {
      var t = nudged.estimate('L', [], [])
      t.should.equal(IDENTITY)

      t = nudged.estimateL([[0, 0]], [[1, 0]], 0)
      assertTransform(t, { s: 1, r: 0, tx: 1, ty: 0 })

      t = nudged.estimateL([[0, 0]], [[1, 0]], Math.PI / 2)
      assertTransform(t, IDENTITY)

      // 5/8 turn, should be equivalent to 1/8 turn.
      var t1 = nudged.estimateL([[-2, -2]], [[1, 5]], Math.PI / 4)
      var t2 = nudged.estimateL([[-2, -2]], [[1, 5]], 5 * Math.PI / 4)
      assertTransform(t1, t2)
    })
    it('should estimate with multiple points', function () {
      // Points go up, but line goes 45 deg.
      var t = nudged.estimate('L', [[1, 1], [2, 0]], [[1, 2], [2, 1]], Math.PI / 4)
      assertTransform(t, { s: 1, r: 0, tx: 0.5, ty: 0.5 })
    })
  })

  describe('.estimateX', function () {
    it('should estimate horizontal translation correctly', function () {
      var t = nudged.estimate('X', [], [])
      t.should.equal(IDENTITY)

      t = nudged.estimateX([[0, 0]], [[1, 0]])
      assertTransform(t, { s: 1, r: 0, tx: 1, ty: 0 })
      t = nudged.estimateX([[0, 0]], [[0, 1]])
      assertTransform(t, { s: 1, r: 0, tx: 0, ty: 0 })
    })
    it('should estimate with multiple points', function () {
      // Points go +1 -1.
      var t = nudged.estimate('X', [[1, 1], [2, 0]], [[2, 0], [3, -1]])
      assertTransform(t, { s: 1, r: 0, tx: 1, ty: 0 })
    })
  })

  describe('.estimateY', function () {
    it('should estimate vertical translation correctly', function () {
      var t = nudged.estimate('Y', [], [])
      t.should.equal(IDENTITY)

      t = nudged.estimateY([[0, 0]], [[1, 0]])
      assertTransform(t, { s: 1, r: 0, tx: 0, ty: 0 })
      t = nudged.estimateY([[0, 0]], [[0, 1]])
      assertTransform(t, { s: 1, r: 0, tx: 0, ty: 1 })
    })
    it('should estimate with multiple points', function () {
      // Points go +1 -1.
      var t = nudged.estimate('Y', [[1, 1], [2, 0]], [[2, 0], [3, -1]])
      assertTransform(t, { s: 1, r: 0, tx: 0, ty: -1 })
    })
  })

  describe('.estimateTSR', function () {
    it('should estimate correctly', function () {
      forSamples('tsr', function (sam, samkey) {
        var transform = nudged.estimateTSR(sam.a, sam.b)
        assertTransform(transform, sam.tsr, samkey)
      })
    })
  })

  describe('.estimateT', function () {
    it('should estimate correctly', function () {
      forSamples('t', function (sam, samkey) {
        var t = nudged.estimate('T', sam.a, sam.b)
        assertTransform(t, sam.t, samkey)
      })
    })
  })

  describe('.estimateS', function () {
    it('should estimate correctly', function () {
      forSamples('s', function (sam, samkey) {
        var t = nudged.estimateS(sam.a, sam.b)
        assertTransform(t, sam.s, samkey)
      })
    })
    it('should estimate fixed situation correctly', function () {
      forSamples('fs', function (sam, samkey) {
        var t = nudged.estimateS(sam.a, sam.b, sam.fixed)
        assertTransform(t, sam.fs, samkey)
      })
    })
  })

  describe('.estimateR', function () {
    it('should estimate correctly', function () {
      forSamples('r', function (sam, samkey) {
        var transform = nudged.estimateR(sam.a, sam.b)
        assertTransform(transform, sam.r, samkey)
      })
    })
    it('should estimate fixed situation correctly', function () {
      forSamples('fr', function (sam, samkey) {
        var t = nudged.estimate('R', sam.a, sam.b, sam.fixed)
        assertTransform(t, sam.fr, samkey)
      })
    })
  })

  describe('.estimateTS', function () {
    it('should estimate correctly', function () {
      forSamples('ts', function (sam, samkey) {
        var t = nudged.estimateTS(sam.a, sam.b)
        assertTransform(t, sam.ts, samkey)
      })
    })
  })

  describe('.estimateTR', function () {
    it('should estimate correctly', function () {
      forSamples('tr', function (sam, samkey) {
        var t = nudged.estimateTR(sam.a, sam.b)
        assertTransform(t, sam.tr, samkey)
      })
    })

    it('should not rotate when singular domain', function () {
      // This domain and range pair caused D to become almost zero
      // but not zero. After proper 'D < epsilon' instead of 'D === 0'
      // the issue should be repaired.
      var dom = [[0.21255673222390348, 0.20282314674735248]]
      var ran = [[0.20801815431164927, 0.19818456883509827]]
      var tr = nudged.estimateTR(dom, ran)
      tr.getScale().should.equal(1)
      tr.getRotation().should.equal(0)
    })
  })

  describe('.estimateSR', function () {
    it('should estimate correctly', function () {
      forSamples('sr', function (sam, samkey) {
        var t = nudged.estimateSR(sam.a, sam.b)
        assertTransform(t, sam.sr, samkey)
      })
    })
    it('should estimate fixed situation correctly', function () {
      forSamples('fsr', function (sam, samkey) {
        var t = nudged.estimate('SR', sam.a, sam.b, sam.fixed)
        assertTransform(t, sam.fsr, samkey)
      })
    })
  })

  describe('.Transform', function () {
    var t

    beforeEach(function () {
      //    |
      //    4     r
      //    |
      //    2 r
      //    |
      // -1-0-1-2-3-4-5-6-7-8-9-
      //    | d
      //   -2   d
      //    |
      var domain = [[1, -1], [2, -2]]
      var range = [[1, 2], [3, 4]]
      // s: 0, r: 2, tx: -1, ty: 0
      t = nudged.estimateTSR(domain, range)
    })

    it('should equal to self', function () {
      t.equal(t).should.equal(true)
      t.equals(t).should.equal(true)
    })

    it('has almostEqual', function () {
      var t1 = new nudged.Transform(nudged.Transform.EPSILON / 10, 0, 0, 0)
      var t2 = new nudged.Transform(nudged.Transform.EPSILON / 5, 0, 0, 0)
      t1.almostEqual(t2).should.equal(true)
      t1.equal(t2).should.equal(false)

      var t3 = new nudged.Transform(nudged.Transform.EPSILON * 10, 0, 0, 0)
      t2.almostEquals(t3).should.equal(false)
    })

    it('should allow single points', function () {
      t.transform([1, 0]).should.deepEqual([-1, 2])
      t.transform([[1, 0]]).should.deepEqual([[-1, 2]])
    })

    it('should be able to return matrix in array form', function () {
      t.getMatrix().should.deepEqual({
        a: 0, b: 2, c: -2, d: 0, e: -1, f: 0
      })
    })

    it('should give rotation in radians', function () {
      t = nudged.estimateTSR([[1, 1], [-1, -1]], [[-2, -2], [2, 2]])
      // s: -2, r: 0, tx: 0, ty: 0
      t.getRotation().should.equal(Math.PI)
    })

    it('should give scale', function () {
      t = nudged.estimateTSR([[1, 1], [-1, -1]], [[-2, -2], [2, 2]])
      // s: -2, r: 0, tx: 0, ty: 0
      t.getScale().should.equal(2)
    })

    it('should give translation', function () {
      t.getTranslation().should.deepEqual([-1, 0])
    })

    it('should be translatable', function () {
      // The image of t should be translated by -2,-2
      var tt = t.translateBy(-2, -2)
      tt.transform([1, 0]).should.deepEqual([-3, 0])
    })

    it('should be scalable', function () {
      // The image of t should be scaled by 2
      var tt = t.scaleBy(2) // s: 0, r: 4, tx: -2, ty: 0
      tt.transform([1, -1]).should.deepEqual([2, 4])
    })

    it('should be scalable around pivot', function () {
      // The image of t should be scaled around pivot.
      var tt = t.scaleBy(2, [2, 3])
      tt.transform([1, -1]).should.deepEqual([0, 1])
    })

    it('should be rotatable', function () {
      // The image of t should be rotated around origo.
      var tt = t.rotateBy(pi / 2)
      tt.transform([1, -1])[0].should.be.approximately(-2, epsilon)
      tt.transform([1, -1])[1].should.be.approximately(1, epsilon)
    })

    it('should be rotatable around pivot', function () {
      // The image of t should be rotated around pivot.
      var tt = t.rotateBy(pi / 2, [2, 2])
      tt.transform([1, -1]).should.deepEqual([2, 1])
    })

    it('should be multipliable', function () {
      var tt = t.multiplyBy(t)
      var tt2 = t.multiplyRight(t) // test alias
      // s: -4, r: 0, tx: -1, ty: -2
      tt.transform([1, -1]).should.deepEqual([-5, 2])
      tt2.transform([1, -1]).should.deepEqual([-5, 2])
    })

    it('should inverse', function () {
      t.inverse().transform([1, 2]).should.deepEqual([1, -1])
    })

    it('should throw if impossible to inverse', function () {
      t = nudged.estimateTSR([[1, 1], [3, 3]], [[2, 2], [2, 2]]);
      (function () { t.inverse() }).should.throw(/Singular/)
    })

    it('should have prebuilt instances', function () {
      var I = nudged.Transform.IDENTITY
      var R90 = nudged.Transform.R90
      var R180 = nudged.Transform.R180
      var R270 = nudged.Transform.R270
      var X2 = nudged.Transform.X2

      I.transform([1, 1]).should.deepEqual([1, 1])
      R90.transform([1, 1]).should.deepEqual([-1, 1])
      R90.multiplyRight(R90).transform([1, 1]).should.deepEqual([-1, -1])
      R90.multiplyRight(R180).transform([1, 1]).should.deepEqual([1, -1])
      R270.transform([1, 1]).should.deepEqual([1, -1])
      X2.transform([1, -1]).should.deepEqual([2, -2])
    })

    it('should be able to convert to CSS string', function () {
      var I = nudged.Transform.IDENTITY
      I.toString().should.equal('matrix(' +
        '1.00000000,0.00000000,' +
        '0.00000000,1.00000000,' +
        '0.00000000,0.00000000)')
      I.translateBy(5, -5).toString().should.equal('matrix(' +
        '1.00000000,0.00000000,' +
        '0.00000000,1.00000000,' +
        '5.00000000,-5.00000000)')
      I.translateBy(0, 1e-10).toString().should.equal('matrix(' +
        '1.00000000,0.00000000,' +
        '0.00000000,1.00000000,' +
        '0.00000000,0.00000000)')
    })
  })
})

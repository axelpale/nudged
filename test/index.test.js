var should = require('should');
var _ = require('lodash');
var pjson = require('../package.json');
var sqrt2 = Math.sqrt(2);
var pi = Math.PI;
var cos = Math.cos;
var sin = Math.sin;

// The unit
var nudged = require('../index');
var IDENTITY = nudged.Transform.IDENTITY;

var samples = {
  'z-00': {
    id: 'should allow arrays of length zero',
    a: [],
    b: [],
    t: IDENTITY,
    s: IDENTITY,
    r: IDENTITY,
    tsr: IDENTITY
  },
  't-00': {
    id: 'Simple translation',
    a: [[0, 0], [0, 1]],
    b: [[1, 1], [1, 2]],
    tsr: { s: 1, r: 0, tx: 1, ty: 1 }
  },
  't-01': {
    id: 'should allow arrays with singleton domain and range',
    a: [[1,1]], b: [[5,5]],
    tsr: { s: 1, r: 0, tx: 4, ty: 4 }
  },
  't-02': {
    id: 'should allow arrays of identical points',
    a: [[1,1], [1,1]], b: [[5,5], [7,7]],
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
    a: [[ 1,  1], [-1, -1]],
    b: [[-1, -1], [ 1,  1]],
    r: { s: -1, r: 0, tx: 0, ty: 0 },
    tsr: { s: -1, r: 0, tx: 0, ty: 0 }
  },
  'sr-00': {
    id: 'Simple scaling & rotation',
    a: [[ 1,  1], [-1, -1]],
    b: [[-2, -2], [ 2,  2]],
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
    a: [[1,1], [1,1]],
    b: [[2,2], [2,2]],
    fixed: [1,1],
    fsr: IDENTITY
  },
  'ts-00': {
    id: 'Simple translation & scaling',
    a: [[ 1, 1], [2, 1], [2, 2], [ 1, 2]],
    b: [[-2,-2], [0,-2], [0, 0], [-2, 0]],
    tsr: { s: 2, r: 0, tx: -4, ty: -4 },
    t: { s: 1, r: 0, tx: -2.5, ty: -2.5 },
    s: { s: 0, r: 0, tx: 0, ty: 0 },
    fixed: [2, 2],
    fs: { s: 4, r: 0, tx: -6, ty: -6}
  },
  'tr-00': {
    id: 'Simple translation & rotation',
    a: [[0, 0], [2, 0], [ 1, 2]],
    b: [[1, 1], [1, 3], [-1, 2]],
    tsr: { s: 0, r: 1, tx: 1, ty: 1 }
  },
  'tsr-00': {
    id: 'Simple translation, scaling, & rotation',
    a: [[1, -1], [ 3, -2]],
    b: [[3,  4], [10,  8]],
    tsr: { s: 2, r: 3, tx: -2, ty: 3 }
  },
  'tsr-01': {
    id: 'Should allow different domain and range lengths',
    a: [[1,-1], [ 3, -2], [1, 2]],
    b: [[3, 4], [10,  8]],
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
};

var pickSamples = function (type) {
  return _.pick(samples, function (s) {
    return s.hasOwnProperty(type);
  });
};

var forSamples = function (type, iteratee) {
  // Usage:
  //   forSamples('sr', function (sample, samkey) { ... })
  var S = pickSamples(type);
  _.forOwn(S, iteratee);
};



var assertTransform = function (t1, t2, msg) {
  if (typeof msg === 'undefined') {
    msg = '';
  } else {
    msg = ' of ' + msg;
  }
  try {
    t1.s.should.equal(t2.s, 's' + msg);
    t1.r.should.equal(t2.r, 'r' + msg);
    t1.tx.should.equal(t2.tx, 'tx' + msg);
    t1.ty.should.equal(t2.ty, 'ty' + msg);
  } catch (assertionError) {
    console.log(t1);
    console.log(t2);
    throw assertionError;
  }
};

var assertIdentity = function (transform) {
  should.ok(transform.equals(IDENTITY));
};



describe('nudged', function () {

  it('should have version that match package', function () {
    nudged.version.should.equal(pjson.version);
  });

  describe('.estimate', function () {

    it('should estimate correctly', function () {
      forSamples('tsr', function (sam, samkey) {
        var transform = nudged.estimate(sam.a, sam.b);
        assertTransform(transform, sam.tsr, samkey);
      });
    });
  });



  describe('.estimateTranslation', function () {
    it('should estimate correctly', function () {
      forSamples('t', function (sam, samkey) {
        var t = nudged.estimateTranslation(sam.a, sam.b);
        assertTransform(t, sam.t, samkey);
      });
    });
  });



  describe('.estimateScaling', function () {
    it('should estimate correctly', function () {
      forSamples('s', function (sam, samkey) {
        var t = nudged.estimateScaling(sam.a, sam.b);
        assertTransform(t, sam.s, samkey);
      });
    });
    it('should estimate fixed situation correctly', function () {
      forSamples('fs', function (sam, samkey) {
        var t = nudged.estimateScaling(sam.a, sam.b, sam.fixed);
        assertTransform(t, sam.fs, samkey);
      });
    });
  });



  describe('.estimateRotation', function () {
    it('should estimate correctly', function () {
      forSamples('r', function (sam, samkey) {
        var transform = nudged.estimateRotation(sam.a, sam.b);
        assertTransform(transform, sam.r, samkey);
      });
    });
    it('should estimate fixed situation correctly', function () {
      forSamples('fr', function (sam, samkey) {
        var t = nudged.estimateRotation(sam.a, sam.b, sam.fixed);
        assertTransform(t, sam.fr, samkey);
      });
    });
  });



  describe('.estimateScalingRotation', function () {
    it('should estimate correctly', function () {
      forSamples('sr', function (sam, samkey) {
        var t = nudged.estimateScalingRotation(sam.a, sam.b);
        assertTransform(t, sam.sr, samkey);
      });
    });
    it('should estimate fixed situation correctly', function () {
      forSamples('fsr', function (sam, samkey) {
        var t = nudged.estimateScalingRotation(sam.a, sam.b, sam.fixed);
        assertTransform(t, sam.fsr, samkey);
      });
    });
  });



  describe('.Transform', function () {
    var t;

    beforeEach(function () {
      var domain = [[1, -1], [ 3, -2]];
      var range = [[3,  4], [10,  8]];
      // s: 2, r: 3, tx: -2, ty: 3
      t = nudged.estimate(domain, range);
    });

    it('should allow single points', function () {
      t.transform([1, 1]).should.deepEqual([-3, 8]);
      t.transform([[1, 1]]).should.deepEqual([[-3, 8]]);
    });

    it('should be able to return matrix in array form', function () {
      t.getMatrix().should.deepEqual([[2, -3, -2], [3, 2, 3], [0, 0, 1]]);
    });

    it('should give rotation in radians', function () {
      t = nudged.estimate([[ 1, 1], [-1,-1]], [[-2,-2], [ 2, 2]]);
      // s: -2, r: 0, tx: 0, ty: 0
      t.getRotation().should.equal(Math.PI);
    });

    it('should give scale', function () {
      t = nudged.estimate([[ 1, 1], [-1,-1]], [[-2,-2], [ 2, 2]]);
      // s: -2, r: 0, tx: 0, ty: 0
      t.getScale().should.equal(2);
    });

    it('should give translation', function () {
      t.getTranslation().should.deepEqual([-2, 3]);
    });

    it('should inverse', function () {
      t.inverse().transform([3, 4]).should.deepEqual([1,-1]);
    });

    it('should throw if impossible to inverse', function () {
      t = nudged.estimate([[1,1], [3,3]], [[2,2], [2,2]]);
      (function () { t.inverse(); }).should.throw(/Singular/);
    });
  });

});

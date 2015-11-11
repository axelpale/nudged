var should = require('should');
var _ = require('lodash');
var pjson = require('../package.json');

// The unit
var nudged = require('../index');

var samples = {
  'z-00': {
    id: 'should allow arrays of length zero',
    a: [],
    b: [],
    s: 1, r: 0, tx: 0, ty: 0
  },
  't-00': {
    id: 'Simple translation',
    a: [[0, 0], [0, 1]],
    b: [[1, 1], [1, 2]],
    s: 1, r: 0, tx: 1, ty: 1
  },
  't-01': {
    id: 'should allow arrays with singleton domain and range',
    a: [[1,1]], b: [[5,5]],
    s: 1, r: 0, tx: 4, ty: 4
  },
  't-02': {
    id: 'should allow arrays of identical points',
    a: [[1,1], [1,1]], b: [[5,5], [7,7]],
    s: 1, r: 0, tx: 5, ty: 5
  },
  's-00': {
    id: 'Simple scaling',
    a: [[1, 1], [-1, -1]],
    b: [[2, 2], [-2, -2]],
    s: 2, r: 0, tx: 0, ty: 0
  },
  'r-00': {
    id: 'Simple rotation',
    a: [[ 1,  1], [-1, -1]],
    b: [[-1, -1], [ 1,  1]],
    s: -1, r: 0, tx: 0, ty: 0
  },
  'sr-00': {
    id: 'Simple scaling & rotation',
    a: [[ 1,  1], [-1, -1]],
    b: [[-2, -2], [ 2,  2]],
    s: -2, r: 0, tx: 0, ty: 0
  },
  'ts-00': {
    id: 'Simple translation & scaling',
    a: [[ 2, 1], [3, 1], [3, 2], [ 2, 2]],
    b: [[-2, 0], [0, 0], [0, 2], [-2, 2]],
    s: 2, r: 0, tx: -6, ty: -2
  },
  'tr-00': {
    id: 'Simple translation & rotation',
    a: [[0, 0], [2, 0], [ 1, 2]],
    b: [[1, 1], [1, 3], [-1, 2]],
    s: 0, r: 1, tx: 1, ty: 1
  },
  'tsr-00': {
    id: 'Simple translation, scaling, & rotation',
    a: [[1, -1], [ 3, -2]],
    b: [[3,  4], [10,  8]],
    s: 2, r: 3, tx: -2, ty: 3
  },
  'tsr-01': {
    id: 'Should allow different domain and range lengths',
    a: [[1,-1], [ 3, -2], [1, 2]],
    b: [[3, 4], [10,  8]],
    s: 2, r: 3, tx: -2, ty: 3
  },
  'ts-01': {
    id: 'Approximating non-uniform scaling',
    a: [[0, 0], [2, 0], [0, 2], [2, 2]],
    b: [[0, 0], [2, 0], [0, 4], [2, 4]],
    s: 1.5, r: 0, tx: -0.5, ty: 0.5
  },
  'c-00': {
    id: 'Constant transformation',
    a: [[0, 0], [2, 0], [0, 2]],
    b: [[1, 1], [1, 1], [1, 1]],
    s: 0.0, r: 0.0, tx: 1.0, ty: 1.0
  }
};

describe('nudged', function () {

  it('should have version that match package', function () {
    nudged.version.should.equal(pjson.version);
  });

  describe('.estimate', function () {

    it('should estimate correctly', function () {
      _.forOwn(samples, function (sple, key) {
        var transform = nudged.estimate(sple.a, sple.b);
        // console.log(sple.id + ':');
        // console.log('s:  ' + transform.s);
        // console.log('r:  ' + transform.r);
        // console.log('tx: ' + transform.tx);
        // console.log('ty: ' + transform.ty);
        transform.s.should.equal(sple.s, sple.id + ': s');
        transform.r.should.equal(sple.r, sple.id + ': r');
        transform.tx.should.equal(sple.tx, sple.id + ': tx');
        transform.ty.should.equal(sple.ty, sple.id + ': ty');
      });
    });
  });

  describe('.estimateFixed', function () {

    it('should allow domain under pivot', function () {
      var t = nudged.estimateFixed([[1,1], [1,1]], [[2,2], [2,2]], [1,1]);
      // Identity transform
      t.transform([5,6]).should.deepEqual([5,6]);
    });
  });

  describe('.estimateTranslation', function () {
    it('should work with empty arrays', function () {
      var t = nudged.estimateTranslation([], []);
      should.ok(t.equals(nudged.Transform.IDENTITY));
    });

    it('should estimate only translation', function () {
      var sam = samples['ts-00'];
      var t = nudged.estimateTranslation(sam.a, sam.b);
      t.s.should.equal(1);
      t.r.should.equal(0);
      t.tx.should.equal(-3.5);
      t.ty.should.equal(-0.5);
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

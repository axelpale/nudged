var should = require('should');
var pjson = require('../package.json');

// The unit
var nudged = require('../index');

var samples = [
  {
    id: 'Simple translation',
    a: [[0, 0], [0, 1]],
    b: [[1, 1], [1, 2]],
    s: 1, r: 0, tx: 1, ty: 1
  },
  {
    id: 'Simple rotation',
    a: [[ 1,  1], [-1, -1]],
    b: [[-1, -1], [ 1,  1]],
    s: -1, r: 0, tx: 0, ty: 0
  },
  {
    id: 'Simple scaling',
    a: [[1, 1], [-1, -1]],
    b: [[2, 2], [-2, -2]],
    s: 2, r: 0, tx: 0, ty: 0
  },
  {
    id: 'Simple rotation & scaling',
    a: [[ 1,  1], [-1, -1]],
    b: [[-2, -2], [ 2,  2]],
    s: -2, r: 0, tx: 0, ty: 0
  },
  {
    id: 'Simple translation & rotation',
    a: [[0, 0], [2, 0], [ 1, 2]],
    b: [[1, 1], [1, 3], [-1, 2]],
    s: 0, r: 1, tx: 1, ty: 1
  },
  {
    id: 'Simple translation, rotation, & scaling',
    a: [[1, -1], [ 3, -2]],
    b: [[3,  4], [10,  8]],
    s: 2, r: 3, tx: -2, ty: 3
  },
  {
    id: 'Approximating non-uniform scaling',
    a: [[0, 0], [2, 0], [0, 2], [2, 2]],
    b: [[0, 0], [2, 0], [0, 4], [2, 4]],
    s: 1.5, r: 0, tx: -0.5, ty: 0.5
  },
  {
    id: 'Constant transformation',
    a: [[0, 0], [2, 0], [0, 2]],
    b: [[1, 1], [1, 1], [1, 1]],
    s: 0.0, r: 0.0, tx: 1.0, ty: 1.0
  }
];

describe('nudged', function () {

  it('should have version that match package', function () {
    nudged.version.should.equal(pjson.version);
  });

  describe('.estimate', function () {

    it('should estimate correctly', function () {
      samples.forEach(function (sple) {
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

    it('should allow arrays of different length', function () {
      // but ignore the points without a pair
      var domain = [[1,-1], [ 3, -2], [1, 2]];
      var range =  [[3, 4], [10,  8]];
      // s: 2, r: 3, tx: -2, ty: 3
      var t = nudged.estimate(domain, range);
      t.transform([1,1]).should.deepEqual([-3,8]);
    });

    it('should allow arrays of length one', function () {
      var t = nudged.estimate([[1,1]], [[5,5]]);
      t.transform([4,4]).should.deepEqual([8,8]);
    });

    it('should allow arrays of length zero', function () {
      var t = nudged.estimate([], []);
      // Identity transform
      t.transform([0,0]).should.deepEqual([0,0]);
      t.transform([7,7]).should.deepEqual([7,7]);
    });

    it('should allow arrays of identical points', function () {
      var t = nudged.estimate([[1,1], [1,1]], [[5,5], [7,7]]);
      t.transform([1,1]).should.deepEqual([6,6]);
    });

  });

  describe('.estimateFixed', function () {

    it('should allow domain under pivot', function () {
      var t = nudged.estimateFixed([[1,1], [1,1]], [[2,2], [2,2]], [1,1]);
      // Identity transform
      t.transform([5,6]).should.deepEqual([5,6]);
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
      t.getInverse().transform([3, 4]).should.deepEqual([1,-1]);
    });

    it('should throw if impossible to inverse', function () {
      t = nudged.estimate([[1,1], [3,3]], [[2,2], [2,2]]);
      (function () { t.getInverse(); }).should.throw(/Singular/);
    });
  });

});

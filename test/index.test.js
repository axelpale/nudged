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
  }
];

describe('nudged', function () {
  it('should have estimate method', function () {
    nudged.should.have.keys('version', 'estimate');
  });

  describe('#estimate', function () {

    it('should estimate correctly', function () {
      samples.forEach(function (sple) {
        var transform = nudged.estimate(sple.a, sple.b);
        transform.s.should.equal(sple.s, sple.id + ': s');
        transform.r.should.equal(sple.r, sple.id + ': r');
        transform.tx.should.equal(sple.tx, sple.id + ': tx');
        transform.ty.should.equal(sple.ty, sple.id + ': ty');
      });
    });

  });

  it('should have version that match package', function () {
    nudged.version.should.equal(pjson.version);
  });
});

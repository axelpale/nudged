const title = 'point.validate: '
const point = require('../../index').point
const validate = point.validate

module.exports = (ts) => {
  ts.test(title + 'various valid points', (t) => {
    t.true(validate({
      x: 1,
      y: 2
    }), 'common point')

    t.true(validate({ x: 0, y: 0, z: 0 }), 'extra prop is ok')

    t.end()
  })

  ts.test(title + 'various invalid points', (t) => {
    t.false(validate({
      x: 0,
      y: NaN
    }), 'detect NaN')

    t.false(validate({}), 'no properties')

    t.false(validate({
      x: 1,
      y: '2'
    }), 'detect string property')

    t.false(validate({
      x: 1,
      yy: 2
    }), 'detect misspelled property')

    t.false(validate({
      x: 1,
      y: null
    }), 'detect null property')

    t.false(validate({
      x: Infinity,
      y: 0
    }), 'infinity is not ok')

    t.end()
  })
}

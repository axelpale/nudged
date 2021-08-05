const title = 'transform.validate: '
const transform = require('../../index').transform
const validate = transform.validate

module.exports = (ts) => {
  ts.test(title + 'various valid transforms', (t) => {
    t.true(validate({
      a: 1,
      b: 2,
      x: 3,
      y: 4
    }))

    t.true(validate(transform.HALF))
    t.true(validate(transform.X2))
    t.true(validate(transform.ROT45))
    t.true(validate(transform.ROT180))

    t.end()
  })

  ts.test(title + 'various invalid transforms', (t) => {
    t.false(validate({
      a: 0,
      b: 0,
      x: 0,
      y: 0
    }), 'scale zero')

    t.false(validate({}), 'no properties')

    t.false(validate({
      a: 1,
      b: 2,
      x: 3,
      y: '4'
    }), 'string property')

    t.false(validate({
      a: 1,
      b: 2,
      x: 3
    }), 'missing property')

    t.end()
  })
}

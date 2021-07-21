// A unit for each point method.
const units = {
  create: require('./create.test'),
  equal: require('./equal.test'),
  fromArray: require('./fromArray.test'),
  // offset: require('./offset.test'),
  // polarOffset: require('./polarOffset.test'),
  toArray: require('./toArray.test'),
  transform: require('./transform.test'),
  transformMany: require('./transformMany.test'),
  validate: require('./validate.test')
}

module.exports = (t) => {
  Object.keys(units).forEach((unitName) => {
    t.test('nudged.point.' + unitName, units[unitName])
  })
}

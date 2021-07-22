// A unit for each method.
const units = {
  almostEqual: require('./almostEqual.test'),
  create: require('./create.test'),
  fromArray: require('./fromArray.test'),
  fromPolar: require('./fromPolar.test'),
  equal: require('./equal.test'),
  getRotation: require('./getRotation.test'),
  getScale: require('./getScale.test'),
  getTranslation: require('./getTranslation.test'),
  inverse: require('./inverse.test'),
  multiply: require('./multiply.test'),
  rotateBy: require('./rotateBy.test'),
  scaleBy: require('./scaleBy.test'),
  toArray: require('./toArray.test'),
  toMatrix: require('./toMatrix.test'),
  toString: require('./toString.test'),
  translateBy: require('./translateBy.test'),
  translateTo: require('./translateTo.test'),
  validate: require('./validate.test')
}

module.exports = (t) => {
  Object.keys(units).forEach((unitName) => {
    t.test('nudged.transform.' + unitName, units[unitName])
  })
}

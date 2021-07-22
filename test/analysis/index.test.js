// A unit for each method.
const units = {
  residuals: require('./residuals.test')
}

module.exports = (t) => {
  Object.keys(units).forEach((unitName) => {
    t.test('analysis.' + unitName, units[unitName])
  })
}

// A unit for each method.
const units = {
  mse: require('./mse.test'),
  residuals: require('./residuals.test'),
  rss: require('./rss.test')
}

module.exports = (t) => {
  Object.keys(units).forEach((unitName) => {
    t.test('analysis.' + unitName, units[unitName])
  })
}

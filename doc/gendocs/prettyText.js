const expressions = require('./expressions')

const prettyArrayLiterals = (text) => {
  return text.replace(expressions.arrayLiteral, '`[$1]$2`')
}

const prettyObjectLiterals = (text) => {
  return text.replace(expressions.objectLiteral, '`{$1}`')
}

const removeGenversion = (text) => {
  return text.replace(expressions.genversion, '')
}

const pointKeyword = /(a|optional|of) point(s?)($|\W+)/g
const transformKeyword = /a transform($|\W+)/g
const toleranceKeyword = /nudged\.tolerance($|\W+)/g
const routeKeywords = (text) => {
  text = text.replace(pointKeyword, '$1 [point$2](#nudgedpoint)$3')
  text = text.replace(transformKeyword, 'a [transform](#nudgedtransform)$1')
  text = text.replace(toleranceKeyword, '[nudged.tolerance](#nudgedtolerance)$1')
  return text
}

module.exports = (text) => {
  text = prettyObjectLiterals(text)
  text = prettyArrayLiterals(text)
  text = removeGenversion(text)
  text = routeKeywords(text)
  return text
}

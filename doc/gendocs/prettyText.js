const expressions = require('./expressions')

const prettyArrayLiterals = (text) => {
  return text.replace(expressions.arrayLiteral, '`[$1]`')
}

const prettyObjectLiterals = (text) => {
  return text.replace(expressions.objectLiteral, '`{$1}`')
}

const removeGenversion = (text) => {
  return text.replace(expressions.genversion, '')
}

module.exports = (text) => {
  text = prettyObjectLiterals(text)
  text = prettyArrayLiterals(text)
  text = removeGenversion(text)
  return text
}

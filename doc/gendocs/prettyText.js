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
const moduleKeyword = /nudged\.(\w+)($|\.$|\.\W+| )/g
const memberKeyword = /nudged\.(\w+)\.(\w+)($|\W+| )/g
const routeKeywords = (text) => {
  text = text.replace(pointKeyword, '$1 [point$2](#nudgedpoint)$3')
  text = text.replace(transformKeyword, 'a [transform](#nudgedtransform)$1')
  text = text.replace(moduleKeyword, '[nudged.$1](#nudged$1)$2')
  text = text.replace(memberKeyword, '[nudged.$1.$2](#nudged$1$2)$3')
  return text
}

module.exports = (text) => {
  const lines = text.split(/\r?\n/)
  let state = 'empty' // empty | paragraph | code

  const prettyLines = lines.map((line) => {
    // Detect state
    const isEmpty = line.match(expressions.empty)
    if (isEmpty && (state === 'paragraph' || state === 'code')) {
      state = 'empty'
    }

    const isCodeBlock = line.match(expressions.codeBlock)
    if (isCodeBlock && state === 'empty') {
      state = 'code'
    }

    if (!isEmpty && !isCodeBlock) {
      state = 'paragraph'
    }

    // Process state
    if (state === 'paragraph') {
      line = prettyObjectLiterals(line)
      line = prettyArrayLiterals(line)
      line = removeGenversion(line)
      line = routeKeywords(line)
    }

    return line
  })

  return prettyLines.join('\n')
}

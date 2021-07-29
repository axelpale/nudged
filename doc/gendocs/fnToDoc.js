const expressions = require('./expressions')

module.exports = (code, codeModule) => {
  // Converts raw code to Markdown API documentation.
  //
  // Parameters
  //   code
  //     string
  //   codeModule
  //     name
  //       function name
  //     moduleName
  //       parent module name the fn belongs to
  //
  // Return
  //   string as Markdown
  //
  const lines = code.split(/\r?\n/)
  let output = ''
  let state = 'init' // init | fn | doc | dontcare
  let substate = 'common' // common | params | return

  const handleInit = (line) => {
    const foundFn = line.match(expressions.function)

    if (foundFn) {
      // Title for the function
      const params = foundFn[1]
      const fullname = codeModule.moduleName + '.' + codeModule.name
      output += '### ' + fullname  + params + '\n\n'

      state = 'fn'
    }
  }

  const handleDoc = (line) => {
    // Expect docs
    const foundCom = line.match(expressions.comment)

    if (foundCom) {
      const comment = foundCom[1] // first captured match

      if (substate === 'common') {
        handleCommon(comment)
      } else if (substate === 'params') {
        handleParams(comment)
      } else if (substate === 'return') {
        handleReturn(comment)
      }

      state = 'doc'
    } else {
      // We are past the api doc comments
      state = 'dontcare'
    }
  }

  const handleCommon = (comment) => {
    // Test if param docs
      const beginParams = comment.match(expressions.paramsTitle)
      if (beginParams) {
        output += 'Parameters:\n'

        substate = 'params'
        return
      }

      const beginReturn = comment.match(expressions.returnTitle)
      if (beginReturn) {
        output += 'Returns:\n'

        substate = 'return'
        return
      }

      // Otherwise, just common docs.
      const pretty = prettyText(comment)
      output += pretty + '\n'
  }

  const handleParams = (comment) => {
    // Parameter listing after "Parameters"
    const param = comment.match(expressions.parameter)
    if (param) {
      // Construct a list
      const indent = param[1] // first captured is the white space prefix
      const text = param[2] // second captured is the text after the indent
      if (indent.length === 2) {
        // Parameter name
        output += '- `' + text + '`\n'
      } else if (indent.length === 4) {
        // Parameter description
        output += '  - ' + text + '\n'
      }
      // Continue in params substate
      substate = 'params'
    } else {
      // The empty line after parameter docs
      output += '\n'
      substate = 'common'
    }
  }

  const handleReturn = (comment) => {
    // Return value docs after "Return"
    const retval = comment.match(expressions.returnValue)
    if (retval) {
      const text = retval[2] // second captured is the text after the indent
      const pretty = prettyText(text)
      output += '- ' + pretty + '\n'
    } else {
      // The empty line after return value docs
      output += '\n'
      substate = 'common'
    }
  }

  const prettyText = (text) => {
    text = prettyObjectLiterals(text)
    text = prettyArrayLiterals(text)
    return text
  }

  const prettyArrayLiterals = (text) => {
    return text.replace(expressions.arrayLiteral, '`[$1]`')
  }
  const prettyObjectLiterals = (text) => {
    return text.replace(expressions.objectLiteral, '`{$1}`')
  }

  lines.forEach((line) => {
    if (state === 'init') {
      handleInit(line)
      return // next
    }

    if (state === 'fn' || state === 'doc') {
      handleDoc(line)
      return // next
    }
  })

  return output
}

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
  let substate = 'common' // common | params | return | example

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
      } else if (substate === 'example') {
        handleExample(comment)
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
        output += '<p style="display: inline">Parameters:</p>\n\n'

        substate = 'params'
        return
      }

      const beginReturn = comment.match(expressions.returnTitle)
      if (beginReturn) {
        output += '<p style="display: inline">Returns:</p>\n\n'

        substate = 'return'
        return
      }

      const beginExample = comment.match(expressions.exampleTitle)
      if (beginExample) {
        output += 'Example:\n\n'

        substate = 'example'
        return
      }

      // Otherwise, just common docs.
      const pretty = prettyText(comment)
      output += pretty + '\n'
  }

  const handleParams = (comment) => {
    // Parameter listing after "Parameters"
    const paramName = comment.match(expressions.parameterName)
    if (paramName) {
      const indent = paramName[1] // first captured is the white space prefix
      const name = paramName[2] // second captured is the parameter name
      if (indent.length < 2) {
        console.warn('Irregular indentation near "' + comment + '"')
      } else {
        const listIndent = indent.substring(0, indent.length - 2)
        output += listIndent + '- `' + name + '`\n'
      }
      // Continue in params substate
      substate = 'params'
    } else {
      const paramDesc = comment.match(expressions.parameterDesc)
      if (paramDesc) {
        const indent = paramDesc[1]
        const desc = paramDesc[2]
        if (indent.length < 2) {
          console.warn('Irregular indentation near "' + comment + '"')
        } else {
          // Parameter description
          const listIndent = indent.substring(0, indent.length - 2)
          const pretty = prettyText(desc)
          // Detect line continuation string ..
          if (pretty.startsWith('..')) {
            output += listIndent + '  ' + pretty.substring(2) + '\n'
          } else {
            output += listIndent + '- ' + pretty + '\n'
          }
        }
        // Continue in params substate
        substate = 'params'
      } else {
        // The empty line after parameter docs
        output += '\n'
        substate = 'common'
      }
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

  const handleExample = (comment) => {
    // Example code after "Example"
    const code = comment.match(expressions.exampleCode)
    if (code) {
      const codeline = code[2] // second captured is the code after the indent
      output += '    ' + codeline + '\n'
    } else {
      // The empty line after examples
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

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

  lines.forEach((line) => {

    if (state === 'init') {
      const foundFn = line.match(expressions.function)

      if (foundFn) {
        // Title for the function
        const params = foundFn[1]
        const fullname = codeModule.moduleName + '.' + codeModule.name
        output += '### ' + fullname  + params + '\n\n'

        state = 'fn'
      }

      return // next
    }

    if (state === 'fn' || state === 'doc') {
      // Expect docs
      const foundCom = line.match(expressions.comment)

      if (foundCom) {
        output += foundCom[1] + '\n' // first captured string

        state = 'doc'
      } else {
        // We are past the api doc comments
        state = 'dontcare'
      }

      return // next
    }
  })

  return output
}

const expressions = require('./expressions')

module.exports = (code, codeModule) => {
  // Converts raw index code to Markdown API documentation.
  //
  // Parameters
  //   code
  //     string
  //   codeModule
  //     object with module name and path
  //
  // Return
  //   string as Markdown
  //
  const lines = code.split(/\r?\n/)
  let output = ''

  lines.forEach((line) => {
    const found = line.match(expressions.comment)
    if (found) {
      output += found[1] + '\n' // first captured string
    }
  })

  return output
}

const expressions = require('./expressions')
const path = require('path')
const requireToDoc = require('./requireToDoc')
const prettyText = require('./prettyText')

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
  let doc = '' // reusable doc aggregate

  output += '## ' + codeModule.name + '\n\n'

  lines.forEach((line) => {

    const found = line.match(expressions.comment)
    if (found) {
      const text = found[1] // first captured string
      doc += text + '\n'

      return
    }

    const foundReq = line.match(expressions.exportsRequire)
    if (foundReq) {
      const moduleName = codeModule.name + '.' + foundReq[1]
      const relativePath = foundReq[2]
      const absPath = path.resolve(codeModule.path, relativePath)
      const requireDoc = requireToDoc({
        doc: doc,
        name: moduleName,
        path: absPath,
        indexToDoc: module.exports // HACK prevent cyclic require
      })

      output += requireDoc
      // doc consumed
      doc = ''

      return
    }

    // not a comment, not a require
    const foundConstant = line.match(expressions.exportsConstant)
    if (foundConstant) {
      const exportedName = foundConstant[1]
      const value = foundConstant[2]

      output += '### ' + codeModule.name + '.' + exportedName + '\n\n'
      output += prettyText(doc)
      // doc consumed
      doc = ''

      return
    }

    // Empty line or something. Output doc this far.
    output += prettyText(doc)
    doc = ''
  })

  return output
}

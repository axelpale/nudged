const expressions = require('./expressions')
const fnToDoc = require('./fnToDoc')
const path = require('path')
const fs = require('fs')

module.exports = (mod) => {
  // Converts raw index code to Markdown API documentation.
  //
  // Parameters
  //   mod, module, object with props
  //     doc
  //       string, documentation form the index
  //     name
  //       exported module name
  //     path
  //       required path
  //     indexToDoc
  //       function, to prevent cyclic require
  //
  // Return
  //   string as Markdown
  //
  let output = ''
  let doc = '' // reusable doc aggregate

  try {
    const modstat = fs.statSync(mod.path)

    if (modstat.isDirectory()) {
      // Search for docs in module index
      const indexpath = path.join(mod.path, 'index.js')
      let indexdata
      try {
        indexdata = fs.readFileSync(indexpath, { encoding: 'utf-8' })
      } catch (e) {
        // No index. Stop.
        // console.error(idxerr)
        return ''
      }

      // Index found
      output += mod.indexToDoc(indexdata, mod)

      return output
    }
  } catch (e) {
    // No such file. Probably needs '.js'
  }

  // Not a directory. Probably a file. Read file contents.
  // NOTE might break for very large files.
  const filepath = mod.path + '.js'
  const filestat = fs.statSync(filepath)
  if (filestat.isFile()) {
    const filedata = fs.readFileSync(filepath, { encoding: 'utf-8' })

    const filelines = filedata.split(/\r?\n/)
    const isFnModule = filelines.some((line) => {
      const foundFn = line.match(expressions.function)
      if (foundFn) {
        return true
      }
      return false
    })

    if (isFnModule) {
      // A function
      output += fnToDoc(filedata, {
        name: mod.name
      })
    } else {
      // New index file
      output += mod.indexToDoc(filedata, {
        doc: mod.doc,
        name: mod.name,
        path: filepath
      })
    }
  }

  return output
}

const fs = require('fs')
const path = require('path')
const asyn = require('async')
const indexToDoc = require('./indexToDoc')

// Code modules to document
const modules = [
  {
    doc: '', // initial docs for consistency
    title: 'Nudged API Documentation',
    name: 'nudged',
    path: path.resolve(__dirname, '../../lib')
  }
]

// Where to save the generated markdown file
const saveTo = path.resolve(__dirname, '../API.md')

// Gather the documentation to this string
let markdown = ''

asyn.eachSeries(modules, (mod, next) => {
  // For each listed module

  // Search for docs in module index
  try {
    const indexpath = path.join(mod.path, 'index.js')
    const indexdata = fs.readFileSync(indexpath, { encoding: 'utf-8' })
    markdown += indexToDoc(indexdata, mod)
  } catch (idxerr) {
    return next(idxerr)
  }

  return next()
}, (err) => {
  // All modules processed or error occurs.
  if (err) {
    console.error(err)

    return
  }

  // Save
  fs.writeFile(saveTo, markdown, (werr) => {
    if (werr) {
      console.error(werr)

      return
    }

    console.log('API docs created successfully.')
    console.log('See ' + saveTo)
  })
})

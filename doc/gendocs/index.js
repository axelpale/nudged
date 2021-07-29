const fs = require('fs')
const path = require('path')
const asyn = require('async')
const fnToDoc = require('./fnToDoc')
const indexToDoc = require('./indexToDoc')

// Code modules to document
const modules = [
  {
    name: 'nudged.point',
    path: path.resolve(__dirname, '../../lib/point')
  },
  // {
  //   name: 'nudged.transform',
  //   path: path.resolve(__dirname, '../../lib/transform')
  // }
  {
    name: 'nudged.estimators',
    path: path.resolve(__dirname, '../../lib/estimators')
  },
  {
    name: 'nudged.analysis',
    path: path.resolve(__dirname, '../../lib/analysis')
  },
]

// Where to save the generated markdown file
const saveTo = path.resolve(__dirname, '../API.md')

// Gather the documentation to this string
let markdown = ''

asyn.eachSeries(modules, (mod, next) => {
  // For each listed module

  // Write title
  markdown += '## ' + mod.name + '\n\n'

  // Search for docs in module index
  const indexpath = path.join(mod.path, 'index.js')
  let indexdata
  try {
    indexdata = fs.readFileSync(indexpath, { encoding: 'utf-8' })
  } catch (idxerr) {
    return next(idxerr)
  }
  markdown += indexToDoc(indexdata, mod)

  // Read all the files in the dir
  fs.readdir(mod.path, (rerr, files) => {
    if (rerr) {
      return next(rerr)
    }

    asyn.eachSeries(files, (filename, nextFile) => {
      const filepath = path.join(mod.path, filename)
      const filestat = fs.statSync(filepath)

      if (filestat.isDirectory()) {
        // Skip dirs
        return nextFile()
      }

      // Read file contents
      // NOTE might break for very large files.
      fs.readFile(filepath, { encoding: 'utf-8' }, (readerr, data) => {
        if (readerr) {
          return nextFile(readerr)
        }

        markdown += fnToDoc(data, {
          name: path.basename(filename, '.js'),
          moduleName: mod.name
        })

        // Successfully converted file to docs
        return nextFile()
      })
    }, (ferr) => {
      // All module's files processed or error occurs.
      if (ferr) {
        return next(ferr)
      }

      return next()
    })
  })
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

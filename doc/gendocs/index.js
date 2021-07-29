const fs = require('fs')
const path = require('path')
const asyn = require('async')
const codeToDoc = require('./codeToDoc')

const modules = [
  {
    name: 'nudged.point',
    path: path.resolve(__dirname, '../../lib/point')
  },
  {
    name: 'nudged.transform',
    path: path.resolve(__dirname, '../../lib/transform')
  }
]

let markdown = ''

asyn.eachSeries(modules, (mod, next) => {
  // For each listed module

  // Write title
  markdown += '## ' + mod.name + '\n\n'

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

        markdown += codeToDoc(data, mod)

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

  console.log(markdown)
  console.log('API docs created successfully')
})

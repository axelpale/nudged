// This Yamdog script generates the API documentation in Markdown.
// See https://github.com/axelpale/yamdog
//
const yamdog = require('yamdog')
const path = require('path')

yamdog.generate({
  // Where to start collecting comment blocks
  entry: path.resolve(__dirname, '../'),
  // Where to generate
  output: path.resolve(__dirname, 'API.md'),
  // Earmark; include comment blocks that begin with this string
  earmark: '@',
  // Main title of the document
  title: 'Nudged API Documentation',
  // Introduction; the initial paragraph
  intro: `Welcome to Nudged interface documentation!
The nudged [API](https://en.wikipedia.org/wiki/API) follows
a [functional and immutable](https://en.wikipedia.org/wiki/Functional_programming) paradigm without classes.
Thus all the functions take in and return plain objects and values
such as \`{ x: 1, y: 2 }\`. The functions never modify the given objects,
never cause side effects, and never memorize previous calls.
In contrast to object-oriented programming, the features are
implemented as pure functions that are grouped
in modules aka namespaces instead of classes.
See the available modules below.`,
  // Decorators; a customizable features to pimp yo docs
  decorators: [
    yamdog.decorators.alphabetical(), // render blocks in alphabetical order
    yamdog.decorators.toc(), // insert tables of contents
    yamdog.decorators.linkNames(),
    yamdog.decorators.linkKeywords({
      point: '#nudgedpoint',
      transform: '#nudgedtransform'
    }),
    yamdog.decorators.italicSingles() // emphasize list items
  ]
})

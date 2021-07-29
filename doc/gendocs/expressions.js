exports.comment = /^\s*\/\/ ?(.*)$/
exports.exportsConstant = /^exports\.(\w+) = ((?!require).*)$/
exports.exportsRequire = /^exports\.(\w+) = require\('([\w\/\.]+)'\)$/
exports.function = /^module\.exports = (?:function )?(\([\w, ]*\))(?: =>)? {$/
exports.paramsTitle = /^param(?:eter)?s:?$/i
exports.returnTitle = /^returns?:?$/i
exports.exampleTitle = /^examples?:?$/i
exports.parameterName = /^(\s+)(\w*)$/
exports.parameterDesc = /^(\s+)(.*)$/
exports.returnValue = /^(\s+)(.*)$/
exports.exampleCode = /^(\s+)(.*)$/
exports.arrayLiteral = /\[([\w,: ]*)\]/
exports.objectLiteral = /{([\w,: ]*)}/

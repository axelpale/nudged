/*
Recursive implementation of Number.prototype.toFixed for collections
*/

var isArray = function (a) {
  if (Object.prototype.toString.call(a) === '[object Array]') {
    return true
  } // else
  return false
}

module.exports = function toFixed (arr, digits) {
  var i, result, type
  type = typeof arr
  if (type === 'number') {
    return arr.toFixed(digits)
  } // else
  if (type === 'object') {
    if (isArray(arr)) {
      // It is array
      result = []
      for (i = 0; i < arr.length; i += 1) {
        result.push(toFixed(arr[i], digits))
      }
      return result
    } // else
    // It is object
    result = {}
    for (i in arr) {
      if (arr.hasOwnProperty(i)) {
        result[i] = toFixed(arr[i], digits)
      }
    }
    return result
  }
}

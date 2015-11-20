/*
Recursive implementation of Number.prototype.toFixed
*/

module.exports = function toFixed(arr, digits) {
  var i, result;
  if (typeof arr !== 'number') {
    // It is array
    result = [];
    for (i = 0; i < arr.length; i += 1) {
      result.push(toFixed(arr[i], digits));
    }
    return result;
  } else {
    return arr.toFixed(digits);
  }
};

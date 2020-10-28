const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route
  for(let i = 0; i < strNums.length; i++) {
    let val  = parseInt(strNums[i])
    strNums[i] = val;
  }
return strNums;
}


module.exports = { convertStrNums };
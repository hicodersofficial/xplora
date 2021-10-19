"use strict";

function twoDigitNum(num) {
  return num > 9 ? num : "0" + num;
}

module.exports = twoDigitNum;

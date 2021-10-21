"use strict";

/**
 * Return number in two digits.
 *
 * @param {number} num
 * @returns {String}
 */
function twoDigitNum(num) {
  return num > 9 ? num : "0" + num;
}

module.exports = twoDigitNum;

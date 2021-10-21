"use strict";

/**
 * Humanize time.
 *
 * @param {number} time duration in millisecond.
 * @returns
 */
function calculateTime(time) {
  if (time / 1000 > 60) {
    return Math.ceil(time / 1000 / 60) + " min";
  }
  if (time > 1000) {
    return Math.ceil(time / 1000) + " sec";
  }
  return time + " ms";
}

module.exports = calculateTime;

"use strict";

/**
 * return extension with dot `.`.
 *
 * @param {String} ext
 * @returns {String}
 */
function makeExtension(ext) {
  return ext.includes(".")
    ? ext.toString().trim()
    : ("." + ext).toString().trim();
}

module.exports = makeExtension;

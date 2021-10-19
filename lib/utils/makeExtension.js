"use strict";

function makeExtension(ext) {
  return ext.includes(".")
    ? ext.toString().trim()
    : ("." + ext).toString().trim();
}

module.exports = makeExtension;

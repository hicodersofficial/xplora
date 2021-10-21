"use strict";

const chalk = require("chalk");

/**
 * Create single Hierarchy.
 *
 * @param {number} indent
 * @param {Boolean} isLastFile
 * @param {String} char
 * @returns {String}
 */
function makeHierarchy(indent, isLastFile, char = "├── ") {
  let cell = "";
  for (let i = 0; i < indent; i++) {
    if (isLastFile && i == indent - 1) {
      cell += chalk.blue("└── ");
    } else if (i == indent - 1) {
      cell += chalk.blue(char);
    } else {
      cell += chalk.blue("│   ");
    }
  }
  return cell;
}

module.exports = makeHierarchy;

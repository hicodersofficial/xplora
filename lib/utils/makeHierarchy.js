"use strict";

const chalk = require("chalk");

function makeHierarchy(indent, char = "├───") {
  let cell = "";
  for (let i = 0; i < indent; i++) {
    cell += chalk.blue(char);
  }
  return cell;
}

module.exports = makeHierarchy;

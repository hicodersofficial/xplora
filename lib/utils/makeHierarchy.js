"use strict";

const chalk = require("chalk");

function makeHierarchy(indent) {
  let cell = "";
  for (let i = 0; i < indent; i++) {
    cell += chalk.blue("├───");
  }
  return cell;
}

module.exports = makeHierarchy;

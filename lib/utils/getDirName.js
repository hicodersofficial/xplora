/**
 * @fileoverview
 * @author Priyanshu Raj
 */

"use strict";

const chalk = require("chalk");
const appState = require("../config/appState");
const CONFIG = require("../config/config");
const getTotalDirsFromPath = require("./getTotalDirsFromPath");
const makeHierarchy = require("./makeHierarchy");

/**
 *
 */
function getDirName(currentPath) {
  const chunks = currentPath.split(CONFIG.PATH_SPLIT_ON);
  const dirname = chunks[chunks.length - 1];
  console.log(
    `${makeHierarchy(
      getTotalDirsFromPath(appState.startDir, currentPath)
    )}${chalk.bold(chalk.green(dirname))}`
  );
}

module.exports = getDirName;

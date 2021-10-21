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
 * Finds out directory name and
 * logs to the console.
 *
 * @param {String} currentPath Path
 * @param {Boolean} isLastFile
 */
function getDirName(currentPath, isLastFile = false) {
  const chunks = currentPath.split(CONFIG.PATH_SPLIT_ON);
  const dirname = chunks[chunks.length - 1];
  console.log(
    `${makeHierarchy(
      getTotalDirsFromPath(appState.startDir, currentPath),
      isLastFile
    )}${chalk.bold(chalk.green(dirname))}`
  );
}

module.exports = getDirName;

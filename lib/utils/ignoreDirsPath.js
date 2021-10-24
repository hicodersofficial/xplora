"use strict";

const path = require("path");
const appState = require("../config/appState");

/**
 * Add path to ignoreDirs set.
 *
 * @param {String} dir Directory path
 */
function ignoreDirsPath(dir, startingDir = appState.startDir) {
  appState.ignoreDirs.add(path.join(startingDir, dir));
}

module.exports = ignoreDirsPath;

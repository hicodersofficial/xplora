"use strict";

const path = require("path");
const appState = require("../config/appState");

/**
 * Add path to ignoreDirs set.
 * @param {String} dir Directory path
 */
function ignoreDirsPath(dir) {
  appState.ignoreDirs.add(path.join(appState.startDir, dir));
}

ignoreDirsPath("node_modules");
ignoreDirsPath(".git");
ignoreDirsPath(".vscode");
ignoreDirsPath(".idea");

module.exports = ignoreDirsPath;

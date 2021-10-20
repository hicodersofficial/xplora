/**
 * @fileoverview Xplora entry point.
 * @author Priyanshu raj
 */

"use strict";

require("./core/command");
const fs = require("fs");
const path = require("path");
const decider = require("./core/decider");
const ignore = require("./core/ignore");
const appState = require("./config/appState");
const stats = require("./core/stats");
const getDirName = require("./utils/getDirName");
const initState = require("./core/initState");

/**
 * Initialize state
 */
initState();

ignore(appState.startDir);

/**
 * Starting time for xplora
 */
appState.startTime = new Date();

/**
 * Initial function that xplora runs
 * This function called on start of
 * application.
 *
 * @param {String} currentDir
 */
function init(currentDir) {
  const ignoreDirs = appState.ignoreDirs;
  let files = readDirectory(currentDir);

  getDirName(currentDir, false);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const currentPath = path.join(currentDir, file);
    const isLastFile = i === files.length - 1;

    if (ignoreDirs.size > 0) {
      if (!ignoreDirs.has(currentPath))
        decider(currentPath, file, init, isLastFile);
      continue;
    }

    decider(currentPath, file, init, isLastFile);
  }
}

/**
 * Reads files of current directory.
 * If error then return empty array.
 *
 * @param {String} currentDir
 * @returns {Array}
 */
function readDirectory(currentDir) {
  try {
    return fs.readdirSync(currentDir);
  } catch (e) {
    return [];
  }
}

/**
 *
 */
init(appState.startDir);

/**
 * End time for xplora
 */
appState.endTime = new Date();

/**
 * Outputs stats after xplora completes.
 */
stats();

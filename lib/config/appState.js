/**
 * @fileoverview application state
 * @author Priyanshu raj
 */

"use strict";

/**
 * Application wise state.
 * @global
 */

const appState = {
  totalFiles: 0,
  totalDir: 0,
  totalSize: 0,
  startDir: process.cwd(),
  option: null,
  endTime: null,
  startTime: null,
  ignoreDirs: new Set(),
  ignoreAll: new Set(),
  totalLinesOfCode: 0,
};

module.exports = appState;

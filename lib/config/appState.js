"use strict";

const appState = {
  totalFiles: 0,
  totalDir: 0,
  totalSize: 0,
  startDir: process.cwd(),
  option: null,
  endTime: null,
  startTime: null,
  ignoreDirs: new Set(),
};

module.exports = appState;

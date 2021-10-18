"use strict";

const calculateFileSize = require("../utils/calculateFileSize");
const getTotalDirsFromPath = require("../utils/getTotalDirsFromPath");
const makeHierarchy = require("../utils/makeHierarchy");

const fs = require("fs");
const appState = require("../config/appState");

function decider(currentPath, file, init) {
  const stats = fs.statSync(currentPath);
  const fileSize = stats.size;
  appState.totalSize += fileSize;
  const isFile = stats.isFile();
  if (isFile) {
    const indent = getTotalDirsFromPath(appState.startDir, currentPath);
    console.log(
      `${makeHierarchy(indent)}${file}  ${calculateFileSize(fileSize)} `
    );
    appState.totalFiles++;
  } else {
    init(currentPath);
    appState.totalDir++;
  }
}

module.exports = decider;

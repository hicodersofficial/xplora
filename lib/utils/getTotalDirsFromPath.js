"use strict";

const path = require("path");
const CONFIG = require("../config/config");

function getTotalDirsFromPath(startDir, currentPath) {
  const relPath = path.relative(startDir, currentPath);
  if (relPath) {
    const len = path
      .relative(startDir, currentPath)
      .split(CONFIG.PATH_SPLIT_ON).length;
    return len;
  }
  return 0;
}

module.exports = getTotalDirsFromPath;

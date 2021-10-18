"use strict";

const path = require("path");

function getTotalDirsFromPath(startDir, currentPath) {
  const relPath = path.relative(startDir, currentPath);
  if (relPath) {
    const len = path.relative(startDir, currentPath).split("\\").length;
    return len;
  }
  return 0;
}

module.exports = getTotalDirsFromPath;

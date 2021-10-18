"use strict";

const calculateFileSize = require("../utils/calculateFileSize");
const getTotalDirsFromPath = require("../utils/getTotalDirsFromPath");
const makeHierarchy = require("../utils/makeHierarchy");

const fs = require("fs");

function decider(
  currentPath,
  file,
  totalSize,
  startDir,
  totalFiles,
  totalDir,
  init
) {
  const stats = fs.statSync(currentPath);
  const fileSize = stats.size;
  totalSize += fileSize;
  const isFile = stats.isFile();
  if (isFile) {
    const indent = getTotalDirsFromPath(startDir, currentPath);
    console.log(
      `${makeHierarchy(indent)}${file}  ${calculateFileSize(fileSize)} `
    );
    totalFiles++;
  } else {
    init(currentPath);
    totalDir++;
  }
}

module.exports = decider;

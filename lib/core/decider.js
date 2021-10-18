"use strict";

const calculateFileSize = require("../utils/calculateFileSize");
const getTotalDirsFromPath = require("../utils/getTotalDirsFromPath");
const makeHierarchy = require("../utils/makeHierarchy");

const fs = require("fs");
const appState = require("../config/appState");
const chalk = require("chalk");
const path = require("path");

function decider(currentPath, file, init) {
  const stats = fs.statSync(currentPath);
  const fileSize = stats.size;
  const isFile = stats.isFile();
  if (isFile) {
    const size = appState.option.fileSize;
    if (size) {
      let filterSize = null;
      let lte;
      let eq;

      if (size.split("==").length > 1) {
        eq = true;
        filterSize = parseInt(size.replace("==", ""));
      }
      if (size.split("<=").length > 1) {
        lte = true;
        filterSize = parseInt(size.replace("<=", ""));
      }

      if (lte && fileSize <= filterSize) {
        display(currentPath, fileSize, chalk.yellow(file));
      } else if (eq && fileSize === filterSize) {
        display(currentPath, fileSize, chalk.yellow(file));
      } else if (fileSize >= size) {
        display(currentPath, fileSize, chalk.yellow(file));
      } else {
        if (!appState.option.filter) {
          display(currentPath, fileSize, file);
        }
      }
    } else if (appState.option.extension) {
      let ext = appState.option.extension;
      ext = ext.includes(".") ? ext : "." + ext;
      if (path.extname(file).toLowerCase() === ext.trim().toLowerCase()) {
        display(currentPath, fileSize, chalk.yellow(file));
      } else {
        if (!appState.option.filter) {
          display(currentPath, fileSize, file);
        }
      }
    } else if (appState.option.fileName) {
      const regex = new RegExp(appState.option.fileName, "gi");
      if (regex.test(file)) {
        display(currentPath, fileSize, chalk.yellow(file));
      } else {
        if (!appState.option.filter) {
          display(currentPath, fileSize, file);
        }
      }
    } else {
      display(currentPath, fileSize, file);
    }
  } else {
    init(currentPath);
    appState.totalDir++;
  }
}

function display(currentPath, fileSize, file) {
  const indent = getTotalDirsFromPath(appState.startDir, currentPath);
  appState.totalSize += fileSize;
  console.log(
    `${makeHierarchy(indent)}${file}  ${calculateFileSize(fileSize)} `
  );
  appState.totalFiles++;
}

module.exports = decider;

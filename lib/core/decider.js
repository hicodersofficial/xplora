/**
 * @fileoverview
 * @author Priyanshu raj
 */

"use strict";

const calculateFileSize = require("../utils/calculateFileSize");
const getTotalDirsFromPath = require("../utils/getTotalDirsFromPath");
const makeHierarchy = require("../utils/makeHierarchy");

const fs = require("fs");
const appState = require("../config/appState");
const chalk = require("chalk");
const path = require("path");
const textExt = require("../shared/textExt");
const makeExtension = require("../utils/makeExtension");
const CONFIG = require("../config/config");
const moment = require("moment");

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
        display(currentPath, fileSize, chalk.yellow(file), stats);
      } else if (eq && fileSize === filterSize) {
        display(currentPath, fileSize, chalk.yellow(file), stats);
      } else if (fileSize >= size) {
        display(currentPath, fileSize, chalk.yellow(file), stats);
      } else {
        if (!appState.option.filter) {
          display(currentPath, fileSize, file, stats);
        }
      }
    } else if (appState.option.extension) {
      if (
        path.extname(currentPath).toLowerCase() ===
        makeExtension(appState.option.extension).trim().toLowerCase()
      ) {
        display(currentPath, fileSize, chalk.yellow(file), stats);
      } else {
        if (!appState.option.filter) {
          display(currentPath, fileSize, file, stats);
        }
      }
    } else if (appState.option.fileName) {
      const regex = new RegExp(appState.option.fileName, "gi");
      if (regex.test(file)) {
        display(currentPath, fileSize, chalk.yellow(file), stats);
      } else {
        if (!appState.option.filter) {
          display(currentPath, fileSize, file, stats);
        }
      }
    } else {
      display(currentPath, fileSize, file, stats);
    }
  } else {
    const chunks = currentPath.split(CONFIG.PATH_SPLIT_ON);
    const dirname = chunks[chunks.length - 1];
    console.log(
      `${makeHierarchy(
        getTotalDirsFromPath(appState.startDir, currentPath)
      )}${chalk.bold(chalk.green(dirname))}`
    );
    appState.totalDir++;
    if (!appState.option.notRecursive) {
      init(currentPath);
    }
  }
}

function display(currentPath, fileSize, file, stats) {
  let loc;
  const lineOfCode = appState.option.lineOfCode;
  if (lineOfCode) {
    if (textExt.has(path.extname(currentPath))) {
      const content = fs.readFileSync(currentPath, {
        encoding: "utf-8",
        flag: "r",
      });
      if (content) {
        const lines = content.split("\n");
        loc = lines.length;
      }
    }
  }
  const indent = getTotalDirsFromPath(appState.startDir, currentPath);
  appState.totalSize += fileSize;

  let spaces = "";
  if (!appState.option.notFormatted && file) {
    const availableIndent =
      parseInt((process.stdout.columns / 100) * 55) -
      (file.length + indent * 4);
    if (availableIndent > 0) {
      for (let i = 0; i < availableIndent; i++) {
        spaces += " ";
      }
    }
  }
  console.log(
    `${makeHierarchy(indent)}${file} ${spaces} ${
      !appState.option.notCreatedTime
        ? chalk.magenta(moment(stats.birthtime).format("MMM, DD YYYY"))
        : ""
    } ${calculateFileSize(fileSize)}  ${
      lineOfCode && loc
        ? `(${chalk.greenBright(chalk.bold(`LOC: `)) + chalk.magenta(loc)})`
        : ""
    } `
  );
  appState.totalFiles++;
  if (lineOfCode && loc) {
    appState.totalLineOfCode += loc;
  }
}

module.exports = decider;

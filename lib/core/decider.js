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
const moment = require("moment");
const expParser = require("../utils/parseExp");

function decider(currentPath, file, init, isLastFile) {
  let stats;
  try {
    stats = fs.statSync(currentPath);
  } catch (error) {
    const indent = getTotalDirsFromPath(appState.startDir, currentPath);
    if (!appState.option.notRecursive) {
      init(currentPath);
    }
    console.log(
      `${makeHierarchy(indent + 1, true)} ${chalk.bold(
        chalk.red(`Access Denied (${error.code})`)
      )}`
    );
    return;
  }
  const fileSize = stats.size;
  const isFile = stats.isFile();
  if (isFile) {
    const size = appState.option.fileSize;
    if (size) {
      if (expParser(size, fileSize)) {
        display(currentPath, fileSize, file, stats, isLastFile, true);
        return;
      }
    }

    if (appState.option.date) {
      const date = appState.option.date;
      if (expParser(date, stats.birthtime, true)) {
        display(currentPath, fileSize, file, stats, isLastFile, true);
        return;
      }
    }

    if (appState.option.fileName) {
      const regex = new RegExp(appState.option.fileName, "gi");
      if (regex.test(file)) {
        display(currentPath, fileSize, file, stats, isLastFile, true);
        return;
      }
    }

    if (appState.option.extension) {
      const extName = path.extname(currentPath).toLowerCase();
      const passExt = makeExtension(appState.option.extension)
        .trim()
        .toLowerCase();

      if (extName === passExt) {
        display(currentPath, fileSize, file, stats, isLastFile, true);
        return;
      }
    }

    if (!appState.option.filter) {
      display(currentPath, fileSize, file, stats, isLastFile);
    }
    return;
  }
  appState.totalDir++;
  if (!appState.option.notRecursive) {
    init(currentPath);
  }
}

function display(
  currentPath,
  fileSize,
  file,
  stats,
  isLastFile,
  isMatch = false
) {
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
    let availableIndent = parseInt((process.stdout.columns / 100) * 55);
    if (isNaN(availableIndent)) {
      availableIndent = 55;
    }
    availableIndent = availableIndent - (file.length + indent * 4);
    if (availableIndent > 0) {
      for (let i = 0; i < availableIndent; i++) {
        spaces += " ";
      }
    }
  }
  console.log(
    `${makeHierarchy(indent, isLastFile)}${
      isMatch ? chalk.yellowBright(file) : file
    } ${spaces} ${
      !appState.option.notCreatedDate
        ? chalk.magenta(moment(stats.birthtime).format(`MMM, DD YYYY`))
        : ""
    } ${
      appState.option.fileCreatedTime
        ? chalk.magenta(moment(stats.birthtime).format("hh:mm a"))
        : ""
    } ${calculateFileSize(fileSize)}  ${
      lineOfCode && loc
        ? `(${chalk.greenBright(chalk.bold(`LOC: `)) + chalk.redBright(loc)})`
        : ""
    } `
  );
  appState.totalFiles++;
  if (lineOfCode && loc) {
    appState.totalLinesOfCode += loc;
  }
}

module.exports = decider;

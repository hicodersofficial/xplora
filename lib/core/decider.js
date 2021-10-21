/**
 * @fileoverview Makes decisions depending on args
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

/**
 * Takes decision depending on
 * file and arguments.
 *
 * @param {String} currentPath
 * @param {String} file
 * @param {Function} init
 * @param {Boolean} isLastFile
 * @returns
 */
function decider(currentPath, file, init, isLastFile) {
  let stats = getStats(currentPath, init);
  if (!stats) return;

  /**
   * File size in bytes.
   * @name fileSize
   * @type {number}
   */
  const fileSize = stats.size;

  /**
   * If path is a file then
   * `true` else `false`
   * @name isFile
   * @type {Boolean}
   */
  const isFile = stats.isFile();

  // checking for file
  if (isFile) {
    // checking for `-f, --file-size` arg.
    if (appState.option.fileSize) {
      if (expParser(appState.option.fileSize, fileSize)) {
        display(currentPath, fileSize, file, stats, isLastFile, true);
        return;
      }
    }

    // checking for `-d, --date` arg.
    if (appState.option.date) {
      if (expParser(appState.option.date, stats.birthtime, true)) {
        display(currentPath, fileSize, file, stats, isLastFile, true);
        return;
      }
    }

    // checking for `-fn, --filename` arg.
    if (appState.option.fileName) {
      const regex = new RegExp(appState.option.fileName, "gi");
      if (regex.test(file)) {
        display(currentPath, fileSize, file, stats, isLastFile, true);
        return;
      }
    }

    // checking for `-e, --extension` arg.
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

    /**
     * This run if any of the above condition didn't
     * ran. but it will not run if xplora was
     * ran with `-f, --filter` command.
     */
    if (!appState.option.filter) {
      display(currentPath, fileSize, file, stats, isLastFile);
    }
    return;
  }

  /**
   * increment directory count.
   */
  appState.totalDir++;

  if (!appState.option.notRecursive) {
    init(currentPath);
  }
}

/**
 * Display hierarchy
 *
 * @param {String} currentPath
 * @param {number} fileSize
 * @param {String} file
 * @param {fs.stats} stats
 * @param {Boolean} isLastFile
 * @param {Boolean} isMatch
 */
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

  const hierarchy = makeHierarchy(indent, isLastFile);
  const filename = isMatch ? chalk.yellowBright(file) : file;
  const createDate = !appState.option.notCreatedDate
    ? chalk.magenta(moment(stats.birthtime).format(`MMM, DD YYYY`))
    : "";
  const createdTime = appState.option.fileCreatedTime
    ? chalk.magenta(moment(stats.birthtime).format("hh:mm a"))
    : "";
  const codes =
    lineOfCode && loc
      ? chalk`({greenBright {bold LOC: }}{redBright ${loc}})`
      : "";

  /**
   * Row is single line
   * @example ```├── index.js    Oct, 18 2021  220 B  (LOC: 15)```
   * @name row
   * @type {String}
   */
  const row = `${hierarchy}${filename} ${spaces} ${createDate} ${createdTime} ${calculateFileSize(
    fileSize
  )}  ${codes}`;

  /**
   * This log row to the console.
   */
  console.log(row);

  appState.totalFiles++;
  if (lineOfCode && loc) {
    appState.totalLinesOfCode += loc;
  }
}

/**
 * Return stats of path.
 *
 * @param {String} currentPath
 * @param {Function} init
 * @returns {fs.Stats | null}
 */
function getStats(currentPath, init) {
  try {
    return fs.statSync(currentPath);
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
  }
  return null;
}

module.exports = decider;

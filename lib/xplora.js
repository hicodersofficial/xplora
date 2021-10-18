"use strict";

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { program } = require("commander");
const ignore = require("./core/ignore");
const CONFIG = require("./config/config");
const calculateTime = require("./utils/calculateTime");
const calculateFileSize = require("./utils/calculateFileSize");
const makeHierarchy = require("./utils/makeHierarchy");
const getTotalDirsFromPath = require("./utils/getTotalDirsFromPath");

program
  .version(CONFIG.VERSION, "-v, --version")
  .option("-i, --ignore [value...]", "Ignore files and directories")
  .parse(process.argv);

const startDir = process.cwd();
const option = program.opts();

const ignoreDirs = new Set();

ignore(startDir, ignoreDirsPath);

ignoreDirsPath("node_modules");
ignoreDirsPath(".git");
ignoreDirsPath(".vscode");
ignoreDirsPath(".idea");

if (option.ignore) {
  if (option.ignore && option.ignore.length > 0)
    option.ignore.forEach((element) => {
      ignoreDirsPath(element);
    });
}

console.log(ignoreDirs);
// process.exit();

let totalFiles = 0;
let totalDir = 0;
let totalSize = 0;
let startTime = new Date();
function ignoreDirsPath(dir) {
  ignoreDirs.add(path.join(startDir, dir));
}

// ignoreDirsPath("./lib/xplora.js");

// console.log(ignoreDirs);

/**
 *
 * @param {String} currentDir
 */
function init(currentDir) {
  try {
    const files = fs.readdirSync(currentDir);
    const chunks = currentDir.split("\\");
    const dirname = chunks[chunks.length - 1];
    console.log(
      `${makeHierarchy(getTotalDirsFromPath(startDir, currentDir))}${chalk.bold(
        chalk.green(dirname)
      )}`
    );

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const currentPath = path.join(currentDir, file);

      if (ignoreDirs.size > 0) {
        if (ignoreDirs.has(currentPath)) {
          continue;
        } else {
          decider(currentPath, file, dirname);
        }
      } else {
        decider(currentPath, file, dirname);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

init(startDir);
let endTime = new Date();
let totalTimeTook = endTime - startTime;
console.log(
  `\n${chalk.green("Done in ")}${chalk.bold(calculateTime(totalTimeTook))}`
);

const stats = {
  "Total Files": totalFiles,
  "Total Directories": totalDir,
  "Total Size": calculateFileSize(totalSize),
};
console.table([stats]);

function decider(currentPath, file) {
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

// TODO: filter file on filesize, file extension,
// filter them total or color match files
// show project stats

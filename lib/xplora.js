"use strict";

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { program } = require("commander");
const CONFIG = require("./config/config");
const makeHierarchy = require("./utils/makeHierarchy");
const getTotalDirsFromPath = require("./utils/getTotalDirsFromPath");
const decider = require("./core/decider");
// const ignore = require("./core/ignore");
const appState = require("./config/appState");
const stats = require("./core/stats");

program
  .version(CONFIG.VERSION, "-v, --version")
  .option("-i, --ignore [value...]", "Ignore files and directories")
  .parse(process.argv);

appState.option = program.opts();

// ignore(startDir, ignoreDirsPath);

ignoreDirsPath("node_modules");
ignoreDirsPath(".git");
ignoreDirsPath(".vscode");
ignoreDirsPath(".idea");

// if (option.ignore) {
//   if (option.ignore && option.ignore.length > 0)
//     option.ignore.forEach((element) => {
//       ignoreDirsPath(element);
//     });
// }
function ignoreDirsPath(dir) {
  appState.ignoreDirs.add(path.join(appState.startDir, dir));
}
appState.startTime = new Date();

function init(currentDir) {
  try {
    const startDir = appState.startDir;
    const ignoreDirs = appState.ignoreDirs;
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
          decider(currentPath, file, init);
        }
      } else {
        decider(currentPath, file, init);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

init(appState.startDir);
appState.endTime = new Date();
stats();

// TODO: filter file on filesize, file extension,
// filter them total or color match files
// show project stats

"use strict";

const fs = require("fs");
const path = require("path");
const { program } = require("commander");
const CONFIG = require("./config/config");
const decider = require("./core/decider");
const ignore = require("./core/ignore");
const appState = require("./config/appState");
const stats = require("./core/stats");
const getDirName = require("./utils/getDirName");

program
  .version(CONFIG.VERSION, "-v,   --version")
  .option("-i,   --ignore [value...]", "Ignore files and directories")
  .option("-e,   --extension <value>", "File extension")
  .option("-f,   --filter", "filter only matched files")
  .option("-loc, --line-of-code", "Line of code")
  .option("-s,   --file-size <value>", "File size")
  .option("-fn,  --file-name <value>", "File name")
  .option("-nr,  --not-recursive", "Not recursive")
  .option("-nf,  --not-formatted", "Not formatted")
  .option("-ncd, --not-created-date", "Hides file created date")
  .option("-fct, --file-created-time", "Show file created time")
  .helpOption("-h,   --help", "Display help for command for xplora")
  .parse(process.argv);

appState.option = program.opts();

ignore(appState.startDir, ignoreDirsPath);

ignoreDirsPath("node_modules");
ignoreDirsPath(".git");
ignoreDirsPath(".vscode");
ignoreDirsPath(".idea");

if (appState.option) {
  if (appState.option.ignore && appState.option.ignore.length > 0) {
    appState.option.ignore.forEach((element) => {
      ignoreDirsPath(element);
    });
  }
}

function ignoreDirsPath(dir) {
  appState.ignoreDirs.add(path.join(appState.startDir, dir));
}
appState.startTime = new Date();

/**
 * Out root dir onces.
 */

/**
 *
 * @param {String} currentDir
 */
function init(currentDir) {
  try {
    const ignoreDirs = appState.ignoreDirs;
    const files = fs.readdirSync(currentDir);
    getDirName(currentDir, false);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const currentPath = path.join(currentDir, file);
      if (ignoreDirs.size > 0) {
        if (ignoreDirs.has(currentPath)) {
          continue;
        } else {
          decider(currentPath, file, init, i == files.length - 1);
        }
      } else {
        decider(currentPath, file, init, i == files.length - 1);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

init(appState.startDir);
appState.endTime = new Date();
stats();

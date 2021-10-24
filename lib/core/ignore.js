"use strict";

const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const appState = require("../config/appState");
const ignoreDirsPath = require("../utils/ignoreDirsPath");

/**
 * Reads `.ignorepath` and creates path for
 * file/directories that will be ignored
 * @param {String} startDir Starting directory path
 */
function ignore(startDir) {
  let ignoreFilePath = path.join(startDir, ".ignorepath");
  if (appState.option.ignorePath) {
    try {
      ignoreFilePath = path.resolve(appState.option.ignorePath);
      if (!fs.existsSync(ignoreFilePath)) {
        console.log(chalk`{red {bold ${ignoreFilePath} was not found.}}`);
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (fs.existsSync(ignoreFilePath)) {
    console.log(chalk.green("Path ignore file was found."));
    const content = fs.readFileSync(ignoreFilePath, { encoding: "utf-8" });
    if (content) {
      const ignoreFiles = content.replaceAll("\r", "").split("\n");
      if (ignoreFiles.length > 0) {
        ignoreFiles.forEach((file) => {
          if (file.startsWith("**"))
            appState.ignoreAll.add(file.replace("**", ""));
          else ignoreDirsPath(file);
        });
      }
    }
  }
}

// TODO: anything with .extension ignore feature
// !.js
// !index

module.exports = ignore;

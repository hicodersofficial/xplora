"use strict";

const path = require("path");
const appState = require("../config/appState");
const ignoreDirsPath = require("../utils/ignoreDirsPath");

function initState() {
  if (appState.option) {
    if (appState.option.ignore && appState.option.ignore.length > 0) {
      for (let i = 0; i < appState.option.ignore.length; i++) {
        ignoreDirsPath(appState.option.ignore[i]);
      }
    }
    if (appState.option.startDir) {
      const sd = appState.option.startDir;
      const pathObj = path.parse(sd);
      appState.startDir = path.format(pathObj);
      if (!pathObj.root) {
        appState.startDir = path.join(process.cwd(), path.format(pathObj));
      }
    }
  }
}

module.exports = initState;

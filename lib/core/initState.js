"use strict";

const path = require("path");
const appState = require("../config/appState");
const ignoreDirsPath = require("../utils/ignoreDirsPath");

function initState() {
  if (appState.option) {
    if (appState.option.startDir) {
      appState.startDir = path.resolve(appState.option.startDir);
    }

    if (appState.option.ignore && appState.option.ignore.length > 0) {
      for (let i = 0; i < appState.option.ignore.length; i++) {
        /**
         * @type {String}
         */
        const element = appState.option.ignore[i];
        if (element.startsWith("**"))
          appState.ignoreAll.add(element.replace("**", ""));
        else ignoreDirsPath(appState.option.ignore[i]);
      }
    }
  }

  ignoreDirsPath("node_modules");
  ignoreDirsPath(".git");
  ignoreDirsPath(".vscode");
  ignoreDirsPath(".idea");
}

module.exports = initState;

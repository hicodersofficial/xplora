"use strict";

const chalk = require("chalk");
const appConfig = require("../config/appState");
const calculateFileSize = require("../utils/calculateFileSize");
const calculateTime = require("../utils/calculateTime");

function stats() {
  let totalTimeTook = appConfig.endTime - appConfig.startTime;
  console.log(
    `\n${chalk.green("Done in ")}${chalk.bold(calculateTime(totalTimeTook))}`
  );

  const stats = {
    "Total Files": appConfig.totalFiles,
    "Total Directories": appConfig.totalDir,
    "Total Size": calculateFileSize(appConfig.totalSize),
  };
  console.table([stats]);
}

module.exports = stats;

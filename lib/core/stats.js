"use strict";

const chalk = require("chalk");
const appConfig = require("../config/appState");
const calculateFileSize = require("../utils/calculateFileSize");
const calculateTime = require("../utils/calculateTime");
const Table = require("cli-table");

const table = new Table({
  head: [
    chalk.bold(chalk.green("Total Files")),
    chalk.bold(chalk.green("Total Directories")),
    chalk.bold(chalk.green("Total Size")),
  ],
  colWidths: [15, 20, 15],
  colAligns: ["middle", "middle", "middle"],
});

function stats() {
  let totalTimeTook = appConfig.endTime - appConfig.startTime;
  console.log(
    `\n${chalk.green("Done in ")}${chalk.bold(calculateTime(totalTimeTook))}`
  );

  table.push([
    appConfig.totalFiles > 10
      ? chalk.cyan(appConfig.totalFiles)
      : chalk.cyan("0" + appConfig.totalFiles),
    appConfig.totalDir > 10
      ? chalk.cyan(appConfig.totalDir)
      : chalk.cyan("0" + appConfig.totalDir),
    calculateFileSize(appConfig.totalSize),
  ]);
  console.log(table.toString());
}

module.exports = stats;

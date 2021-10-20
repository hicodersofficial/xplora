"use strict";

const chalk = require("chalk");
const appConfig = require("../config/appState");
const calculateFileSize = require("../utils/calculateFileSize");
const calculateTime = require("../utils/calculateTime");
const Table = require("cli-table");
const twoDigitNum = require("../utils/towDigitNum");

function stats() {
  let data = [
    chalk.cyan(
      new Intl.NumberFormat({
        minimumIntegerDigits: 2,
      }).format(twoDigitNum(appConfig.totalFiles))
    ),

    chalk.cyan(
      new Intl.NumberFormat({
        minimumIntegerDigits: 2,
      }).format(twoDigitNum(appConfig.totalDir))
    ),

    calculateFileSize(appConfig.totalSize),
  ];

  const head = [
    chalk.magenta("Total Files"),
    chalk.magenta("Total Directories"),
    chalk.magenta("Total Size"),
  ];

  const colWidths = [15, 20, 15];
  const colAligns = ["middle", "middle", "middle"];

  let totalTimeTook = appConfig.endTime - appConfig.startTime;

  if (appConfig.option.lineOfCode) {
    data.push(
      chalk.cyan(new Intl.NumberFormat().format(appConfig.totalLinesOfCode))
    );
    head.push(chalk.magenta("Line of code"));
    colWidths.push(20);
    colAligns.push("middle");
  }

  const table = new Table({
    head,
    colWidths,
    colAligns,
  });

  console.log(
    `\n${chalk.green("Done in ")}${chalk.bold(calculateTime(totalTimeTook))}`
  );

  table.push(data);
  console.log(table.toString());
}

module.exports = stats;

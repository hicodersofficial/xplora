"use strict";

const chalk = require("chalk");
const appConfig = require("../config/appState");
const calculateFileSize = require("../utils/calculateFileSize");
const calculateTime = require("../utils/calculateTime");
const Table = require("cli-table");
const twoDigitNum = require("../utils/towDigitNum");

function stats() {
  let table;
  let dataTable;
  let totalTimeTook = appConfig.endTime - appConfig.startTime;

  if (appConfig.option.lineOfCode) {
    table = new Table({
      head: [
        chalk.magenta("Total Files"),
        chalk.magenta("Total Directories"),
        chalk.magenta("Total Size"),
        chalk.magenta("Line of code"),
      ],
      colWidths: [15, 20, 15, 20],
      colAligns: ["middle", "middle", "middle", "middle"],
    });
    dataTable = [
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

      chalk.cyan(new Intl.NumberFormat().format(appConfig.totalLineOfCode)),
    ];
  } else {
    table = new Table({
      head: [
        chalk.magenta("Total Files"),
        chalk.magenta("Total Directories"),
        chalk.magenta("Total Size"),
      ],
      colWidths: [15, 20, 15],
      colAligns: ["middle", "middle", "middle"],
    });
    dataTable = [
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
  }
  console.log(
    `\n${chalk.green("Done in ")}${chalk.bold(calculateTime(totalTimeTook))}`
  );

  table.push(dataTable);
  console.log(table.toString());
}

module.exports = stats;

"use strict";

const chalk = require("chalk");

function calculateFileSize(size) {
  if (size / 1024 ** 2 > 999) {
    return chalk.red((size / 1024 ** 3).toFixed("1") + " GB");
  }

  if (size / 1024 > 999) {
    return chalk.yellowBright((size / 1024 ** 2).toFixed(1) + " MB");
  }

  if (size > 999) {
    return chalk.blue((size / 1024).toFixed(1) + " KB");
  }
  return chalk.cyan(size + " B");
}

module.exports = calculateFileSize;

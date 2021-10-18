"use strict";
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

function ignore(startDir, ignoreDirsPath) {
  const ignoreFilePath = path.join(startDir, ".ignorepath");
  if (fs.existsSync(ignoreFilePath)) {
    console.log(chalk.green("Path ignore file was found."));
    const content = fs.readFileSync(ignoreFilePath, { encoding: "utf-8" });
    if (content) {
      const ignoreFiles = content.replaceAll("\r", "").split("\n");
      if (ignoreFiles.length > 0) {
        ignoreFiles.forEach((file) => {
          ignoreDirsPath(file);
        });
      }
    }
  }
}

module.exports = ignore;

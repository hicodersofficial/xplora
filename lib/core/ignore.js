"use strict";
const fs = require("fs");
const path = require("path");
// const chalk = require("chalk");

function ignore(startDir, ignoreDirsPath) {
  const ignoreFilePath = path.join(startDir, ".ignorepath");
  if (fs.existsSync(ignoreFilePath)) {
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

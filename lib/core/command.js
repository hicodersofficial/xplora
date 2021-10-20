/**
 * @fileoverview initialize commander.js
 * @author Priyanshu raj
 */

"use strict";

const { program } = require("commander");
const CONFIG = require("../config/config");
const appState = require("../config/appState");

program
  .version(CONFIG.VERSION, "-v,   --version")
  .option("-i,   --ignore [value...]", "Ignore files and directories")
  .option("-e,   --extension <value>", "File extension")
  .option("-loc, --line-of-code", "Line of code")
  .option("-f,   --filter", "filter only matched files")
  .option("-d,  --date <value>", "Date to filter")
  .option("-s,   --file-size <value>", "File size")
  .option("-fn,  --file-name <value>", "File name")
  .option("-nr,  --not-recursive", "Not recursive")
  .option("-nf,  --not-formatted", "Not formatted")
  .option("-sd,  --start-dir <path>", "Starting Directory path")
  .option("-ncd, --not-created-date", "Hides file created date")
  .option("-fct, --file-created-time", "Show file created time")
  .helpOption("-h,   --help", "Display help for command for xplora")
  .parse(process.argv);

appState.option = program.opts();

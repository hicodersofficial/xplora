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
  .option("-i,   --ignore [value...]", "Ignore files and directories.")
  .option("-e,   --extension <value>", "Matches for file extension.")
  .option("-loc, --line-of-code", "Outputs Lines of code.")
  .option("-f,   --filter", "Filter only matched files.")
  .option(
    "-d,   --date <value>",
    `Matches created date of file. Formats:
                           (">=mm-dd-yy"), ("<=mm-dd-yy hh:mm a"),
                           (">mm-dd-yy hh:mm"), (">=mm-dd-yy | <mm-dd-yy")
                           `
  )
  .option(
    "-s,   --file-size <value>",
    `Matched file size in bytes. Format: 1000, 
                           (">=1000"), ("<1000"), 
                           (">=1000 | <2000")
                           `
  )
  .option("-fn,  --file-name <value>", "Matches for file name.")
  .option("-nr,  --not-recursive", "Not recursive")
  .option("-nf,  --not-formatted", "Not formatted")
  .option("-sd,  --start-dir <path>", "Starting Directory path.")
  .option("-ncd, --not-created-date", "Hides file created date.")
  .option("-fct, --file-created-time", "Shows file created time.")
  .helpOption("-h,   --help", "Display help for command for xplora.")
  .parse(process.argv);

appState.option = program.opts();

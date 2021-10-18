"use strict";

const packageJson = require("../../package.json");
const os = require("os");

const CONFIG = {
  APP_NAME: packageJson.displayName,
  PACKAGE_NAME: packageJson.name,
  VERSION: packageJson.version,
  PATH_SPLIT_ON: os.platform() === "win32" ? "\\" : "/",
};

module.exports = CONFIG;

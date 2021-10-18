"use strict";

const packageJson = require("../../package.json");

const CONFIG = {
  APP_NAME: packageJson.displayName,
  PACKAGE_NAME: packageJson.name,
  VERSION: packageJson.version,
};

module.exports = CONFIG;

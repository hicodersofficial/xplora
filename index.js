#!/usr/bin/env node

/**
 * @fileoverview Application entry point.
 * @author Priyanshu raj
 */

"use strict";

// Replaces all match from string.
// NOTE: this is the fixed for linux.
String.prototype.replaceAll = function (match, val) {
  const regex = new RegExp(match, "g");
  return this.replace(regex, val);
};

module.exports = require("./lib/xplora");

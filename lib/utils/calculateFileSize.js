"use strict";

function calculateFileSize(size) {
  if (size / 1024 ** 2 > 999) {
    return (size / 1024 ** 3).toFixed("1") + " GB";
  }

  if (size / 1024 > 999) {
    return (size / 1024 ** 2).toFixed(1) + " MB";
  }

  if (size > 999) {
    return (size / 1024).toFixed(1) + " KB";
  }
  return size + " B";
}

module.exports = calculateFileSize;

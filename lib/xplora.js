const fs = require("fs");
const path = require("path");
const os = require("os");

const ignoreDirs = [];
const startDir = process.cwd();
const directories = [startDir];

let totalFiles = 0;
let totalDir = 0;

let gIndent = "";

function ignoreDirsPath(dir) {
  ignoreDirs.push(path.join(startDir, dir));
}

ignoreDirsPath("node_modules");
ignoreDirsPath(".git");
// ignoreDirsPath("./lib/xplora.js");

// console.log(ignoreDirs);

const currentDir = directories[0];

/**
 *
 * @param {String} currentDir
 */
function init(currentDir) {
  try {
    const files = fs.readdirSync(currentDir);
    const chunks = currentDir.split("\\");
    const dirname = chunks[chunks.length - 1];
    console.log(`${gIndent}${dirname}`);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const currentPath = path.join(currentDir, file);

      if (ignoreDirs.length > 0) {
        if (ignoreDirs.includes(currentPath)) {
          continue;
        } else {
          decider(currentPath, file, dirname);
        }
      } else {
        decider(currentPath, file, dirname);
      }
    }
  } catch (error) {
    console.log(error);
  }
}

init(currentDir);
console.log(totalFiles);
console.log(totalDir);

function decider(currentPath, file, dirname) {
  const stats = fs.statSync(currentPath);
  const fileSize = stats.size / 1024;
  const isFile = stats.isFile();
  if (isFile) {
    // do something

    let space = "";
    const indent = getTotalDirsFromPath(currentPath);
    for (let i = 0; i < indent; i++) {
      space += "├──";
    }
    gIndent = space;

    console.log(`${space}${file}  ${Math.ceil(fileSize)} KB`);
    totalFiles++;
  } else {
    init(currentPath);
    totalDir++;
  }
}

function getTotalDirsFromPath(currentPath) {
  // console.log(path.relative(startDir, currentPath));
  return path.relative(startDir, currentPath).split("\\").length;
}

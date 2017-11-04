const jetpack = require("fs-jetpack");
const path = require("path");
const { removeExt, zip } = require("./util");
const runCmd = require("./cmds");

function readScripts(name) {
  if (!jetpack.exists(name)) {
    throw new Error(
      `Can't find ${name}! Did you put it in your root directory? Are you running this from your root directory?`
    );
  }

  const files = jetpack.list(name);
  const filesWithoutExts = files.map(removeExt); // Remove `.js` or whatnot
  const filesWithPaths = files.map(file => path.resolve(name, file)); // make folder/file.js
  const commands = filesWithPaths.map(runCmd);

  return zip(filesWithoutExts, commands);
}

module.exports = {
  readScripts
};

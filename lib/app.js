const pkg = require("./pkg");
const dir = require("./dir");
const jetpack = require("fs-jetpack");
const path = require("path");

function update(filepath, scriptsDirName) {
  if (!jetpack.exists(filepath)) {
    throw new Error(
      "The root filepath was undefined when we tried to update. This is a pretty bad error, tell the maintainer!"
    );
  }

  const scripts = dir.readScripts(path.resolve(filepath, scriptsDirName));
  pkg.writeScripts(scripts, `${filepath}/package.json`);
}

module.exports = {
  update
};

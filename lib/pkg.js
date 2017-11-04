const jetpack = require("fs-jetpack");

function getPackageJSON(_pkgName = "package.json") {
  if (!jetpack.exists(_pkgName)) {
    throw new Error(
      `Can't find the ${_pkgName}! Are you in your project's root directory?`
    );
  }

  return jetpack.read(_pkgName, "json");
}

function writeScripts(scripts, _pkgName = "package.json") {
  const json = getPackageJSON(_pkgName);
  json.scripts = Object.assign({}, json.scripts, scripts);
  jetpack.write(_pkgName, json);
}

module.exports = {
  writeScripts
};

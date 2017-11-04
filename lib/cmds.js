const { getExt } = require("./util");

function runCmd(name) {
  const ext = getExt(name);

  if (ext === ".js") {
    return `node ./${name}`;
  }

  return `./${name}`;
}

module.exports = runCmd;

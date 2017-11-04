const log = console.log;
const chalk = require("chalk");

function newCommandsCreated(scripts) {
  log(`Added ${chalk.green(scripts.length)} new npm commands!`);
  for (let script of scripts) {
    log(`$ npm run ${script}`);
  }
}

module.exports = { newCommandsCreated };

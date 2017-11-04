#!/usr/bin/env node
const chalk = require("chalk");
const log = console.log;

const helpString = `
Usage: 

    kitty <dir>

Description:

    Script-kitty takes any scripts you have 
    in your <dir> and converts them into runnable 
    npm commands in your package.json file.

Example:

    Lets say you have a project setup like this:

    MyProject 
    - ... some code files
    - package.json
    - scripts
        - foo.js
        - bar.sh

    You can run "kitty scripts" and script-kitty
    will create the following commands for you:

    npm run foo
    npm run bar
`;

// Check if user passed in an argument
const file = process.argv[2];
if (!file) {
  log(helpString);
  return;
}

// Attempt to update the package.json,
// Log any errors if we find them.
try {
  const app = require("./lib/app");
  app.update(__dirname, process.argv[2]);
} catch (err) {
  log(chalk.red(err.message));
}

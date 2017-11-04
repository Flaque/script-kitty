#!/usr/bin/env node
const chalk = require("chalk");
const log = console.log;
const print = require("./lib/print");
const finder = require('find-root');
const path = require('path')


const helpString = `
Usage: 

    script-kitty <dir>

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

    You can run "script-kitty scripts" and script-kitty
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
  const root = finder(process.cwd());

  const app = require("./lib/app");
  const scripts = app.update(root, process.cwd() +'\\' + process.argv[2]);
  const names = Object.keys(scripts);
  print.newCommandsCreated(names);
} catch (err) {
    if(err.message == 'package.json not found in path'){
        log(chalk.red(`script-kitty couldn't find a package.json file in your workspace 😿`));        
    }else{
        log(chalk.red(err.message));        
    }
}

# 🐱 script-kitty

## Install

With npm:
```
npm install -g script-kitty
```

With yarn:
```
yarn global add script-kitty
```

You can also install it in your project's `devDependencies`: 

``` 
npm install --save-dev script-kitty
```

and then create an `update-scripts` command like so:

``` json
{
    ... // name, version, description, whatnot
    "scripts": {
        "update-scripts": "./node_modules/.bin/script-kitty scripts"
        ... // other scripts
    }
}
```

## Overview 

Script Kitty is a command line tool that takes a folder full of scripts (bash or otherwise) and sets them as `scripts` commands in your `package.json`.

For example, given a folder system that looks like this:
``` 
MyAwesomeProject
  - ... // Some code files
  - package.json 
  - scripts
    - bloop.sh
    - shmoop.sh
    - fuzzbing.js
```

Running `script-kitty scripts` in your project root will generate 3 commands for you like this:
```
npm run bloop
npm run shmoop
npm run fuzzbing
```

It does this by editing your `package.json` like so:
``` json
{
    ... // name, version, description, whatnot
    "scripts": {
        "bloop": "./scripts/bloop.sh",
        "shmoop": "./scripts/shmoop.sh",
        "fuzzbing": "node ./scripts/fuzzbing.js"
    }
}
```

## Why would I need this?
This tool was made to avoid `scripts` bloat. If your `scripts` look like this:

``` json
"scripts": {
    "build": "webpack --config app/renderer/renderer.config.js",
    "db-migrate-create": "node node_modules/db-migrate/bin/db-migrate create $NAME -e dev --config config/database.json",
    "test": "NODE_ENV=test ./node_modules/.bin/jest",
    "test-windows": "set NODE_ENV=test&& npm run test-windows2",
    "test-windows2": "./node_modules/.bin/jest",
    "test-on-ci": "xvfb-maybe ./node_modules/.bin/jest --runInBand",
    "test-watch": "./node_modules/.bin/jest --watch",
    "plop": "./node_modules/.bin/plop",
    "lint": "./node_modules/.bin/eslint lib app",
    "lint-fix": "./node_modules/.bin/eslint --fix lib app",
    "dev": "NODE_ENV=dev && npm run build && electron app/main/index.js",
    "prod": "NODE_ENV=prod && npm run build && electron app/main/index.js",
    "dev-down": "node node_modules/db-migrate/bin/db-migrate down -e dev --config config/database.json",
    "prod-down": "node node_modules/db-migrate/bin/db-migrate down -e prod --config config/database.json",
    "test-down": "node node_modules/db-migrate/bin/db-migrate down -e test --config config/database.json",
    "dev-up": "node node_modules/db-migrate/bin/db-migrate up -e dev --config config/database.json",
    "prod-up": "node node_modules/db-migrate/bin/db-migrate up -e prod --config config/database.json",
    "test-up": "node node_modules/db-migrate/bin/db-migrate up -e test --config config/database.json",
    "dev-reset": "node node_modules/db-migrate/bin/db-migrate reset -e dev --config config/database.json",
    "prod-reset": "node node_modules/db-migrate/bin/db-migrate reset -e prod --config config/database.json",
    "test-reset": "node node_modules/db-migrate/bin/db-migrate reset -e test --config config/database.json",
    "create-db-config": "NODE_ENV=dev babel-node lib/io/sqlite/scripts/createDatabaseConfig.js",
    "dev-windows": "set NODE_ENV=dev&& npm run build && electron app/main/index.js",
    "prod-windows": "set NODE_ENV=prod&& npm run build && electron app/main/index.js",
    "fmt": "./node_modules/.bin/prettier --write '!(coverage|scripts|.vscode|node_modules)/**/!(.compiled|build|dist)/*.js'",
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook",
    "dist": "./node_modules/.bin/electron-packager . --out ./dist --overwrite",
    "snyk-protect": "snyk protect",
    "prepare": "npm run snyk-protect"
  }
```

Instead, we can move these commands into single files that will let us combine some of these tools into single commands. 
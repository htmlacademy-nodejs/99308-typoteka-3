'use strict';

const packageJsonFile = require(`../../../package.json`);
const chalk = require(`chalk`);

module.exports = {
  name: `--version`,
  run() {
    console.log(chalk.blue(packageJsonFile.version));
  }
};

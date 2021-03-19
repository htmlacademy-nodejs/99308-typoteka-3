'use strict';

const {Cli} = require(`./cli`);
const {ExitCode, USER_ARGV_INDEX, DEFAULT_COMMAND} = require(`../constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

if (userArguments.length > 0 && Cli[userCommand]) {
  Cli[userCommand].run(userArguments.slice(1));
} else {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.SUCCESS);
}

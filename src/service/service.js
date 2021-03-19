'use strict';

const {Cli} = require(`./cli`);
const {ExitCode, USER_ARGV_INDEX} = require(`../constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [userCommand] = userArguments;

Cli[userCommand].run(userArguments.slice(1));

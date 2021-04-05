'use strict';

const DEFAULT_COUNT = 1;
const MAX_POSTS = 1000;
const FILE_NAME = `mocks.json`;
const USER_ARGV_INDEX = 2;
const DEFAULT_COMMAND = `--help`;

const TITLES_FILE_PATH = `./data/titles.txt`;
const SENTENCES_FILE_PATH = `./data/sentences.txt`;
const CATEGORIES_FILE_PATH = `./data/categories.txt`;

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1
};

module.exports = {
  TITLES_FILE_PATH,
  SENTENCES_FILE_PATH,
  CATEGORIES_FILE_PATH,
  DEFAULT_COUNT,
  MAX_POSTS,
  FILE_NAME,
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  ExitCode
};

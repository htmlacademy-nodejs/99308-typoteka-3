'use strict';

const DEFAULT_COUNT = 1;
const MAX_POSTS = 1000;
const MAX_COMMENTS = 4;
const FILE_NAME = `mocks.json`;
const USER_ARGV_INDEX = 2;
const DEFAULT_COMMAND = `--help`;

const TITLES_FILE_PATH = `./data/titles.txt`;
const FILE_COMMENTS_PATH = `./data/comments.txt`;
const SENTENCES_FILE_PATH = `./data/sentences.txt`;
const CATEGORIES_FILE_PATH = `./data/categories.txt`;

const ExitCode = {
  SUCCESS: 0,
  ERROR: 1
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

const MAX_ID_LENGTH = 6;

const API_PREFIX = `/api`;

module.exports = {
  TITLES_FILE_PATH,
  SENTENCES_FILE_PATH,
  CATEGORIES_FILE_PATH,
  FILE_COMMENTS_PATH,
  DEFAULT_COUNT,
  MAX_POSTS,
  MAX_COMMENTS,
  FILE_NAME,
  USER_ARGV_INDEX,
  DEFAULT_COMMAND,
  MAX_ID_LENGTH,
  API_PREFIX,
  ExitCode,
  HttpCode
};

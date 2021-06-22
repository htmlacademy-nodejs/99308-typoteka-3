'use strict';

const {
  TITLES_FILE_PATH,
  SENTENCES_FILE_PATH,
  CATEGORIES_FILE_PATH,
  FILE_COMMENTS_PATH,
  DEFAULT_COUNT,
  MAX_POSTS,
  MAX_COMMENTS,
  FILE_NAME,
  MAX_ID_LENGTH,
  ExitCode
} = require(`../../constants`);

const fs = require(`fs`).promises;
const {nanoid} = require(`nanoid`);
const chalk = require(`chalk`);
const {getRandomInt, shuffle, getRandomDate} = require(`../../utils`);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf-8`);
    return content.trim().split(`\n`);
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments).slice(0, getRandomInt(1, 3)).join(` `)
  }))
);

const generatePosts = (count, titles, sentences, categories, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    title: titles[getRandomInt(0, titles.length - 1)],
    announce: shuffle(sentences).slice(0, getRandomInt(1, 4)).join(` `),
    fullText: shuffle(sentences).slice(0, getRandomInt(4, sentences.length - 1)).join(` `),
    createdDate: getRandomDate(),
    сategory: shuffle(categories).slice(0, getRandomInt(1, 2)),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments)
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const titles = await readContent(TITLES_FILE_PATH);
    const sentences = await readContent(SENTENCES_FILE_PATH);
    const categories = await readContent(CATEGORIES_FILE_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);
    const [count] = args;
    const countPost = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countPost > MAX_POSTS) {
      console.error(chalk.red(`Не больше ${MAX_POSTS} публикаций!`));
      process.exit(ExitCode.ERROR);
    }
    const content = JSON.stringify(generatePosts(countPost, titles, sentences, categories, comments));
    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.ERROR);
    }
  }
};

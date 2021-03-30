'use strict';

const {
  TITLES,
  SENTENCES,
  CATEGORIES,
  DEFAULT_COUNT,
  MAX_POSTS,
  FILE_NAME,
  ExitCode
} = require(`../../constants`);

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const {getRandomInt, shuffle, getRandomDate} = require(`../../utils`);

const generatePosts = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    announce: shuffle(SENTENCES).slice(0, getRandomInt(1, 4)).join(` `),
    fullText: shuffle(SENTENCES).slice(0, getRandomInt(4, SENTENCES.length - 1)).join(` `),
    createdDate: getRandomDate().toLocaleString(`ru`),
    сategory: shuffle(CATEGORIES).slice(0, getRandomInt(1, 2)),
  }))
);

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countPost = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countPost > MAX_POSTS) {
      console.error(chalk.red(`Не больше ${MAX_POSTS} публикаций!`));
      process.exit(ExitCode.ERROR);
    }
    const content = JSON.stringify(generatePosts(countPost));
    try {
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.ERROR);
    }
  }
};

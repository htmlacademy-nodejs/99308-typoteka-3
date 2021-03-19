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

const fs = require(`fs`);
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
  run(args) {
    const [count] = args;
    const countPost = Number.parseInt(count, 10) || DEFAULT_COUNT;
    if (countPost > MAX_POSTS) {
      console.log(`Не больше ${MAX_POSTS} публикаций!`);
      process.exit(ExitCode.ERROR);
    }
    const content = JSON.stringify(generatePosts(countPost));
    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.log(`Can't write data to file...`);
        process.exit(ExitCode.ERROR);
      }
      console.info(`Operation success. File created.`);
    });
  }
};

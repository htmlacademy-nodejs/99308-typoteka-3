'use strict';

const {TITLES, SENTENCES, CATEGORIES} = require(`../../constants`);

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

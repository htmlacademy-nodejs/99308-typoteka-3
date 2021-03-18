'use strict';

const {TITLES, SENTENCES, CATEGORIES} = require(`../../constants`);

const generatePosts = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[0],
    announce: SENTENCES[0],
    fullText: SENTENCES[1],
    createdDate: Date.now(),
    сategory: CATEGORIES,
  }))
);

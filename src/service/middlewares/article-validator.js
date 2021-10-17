'use strict';

const {HttpCode} = require(`../../constants`);

const articleKeys = [
  `category`,
  `announce`,
  `title`,
  `fullText`
];

module.exports = (req, res, next) => {
  const newArticle = req.body;
  const keys = Object.keys(newArticle);
  const keysExists = articleKeys.every((key) => keys.includes(key));
  if (!keysExists) {
    return res.status(HttpCode.BAD_REQUEST)
      .send(`Bad request`);
  }
  return next();
};

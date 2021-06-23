'use strict';

const {Router} = require(`express`);
const {
  CategoryService,
  ArticleService,
  CommentService,
  SearchService
} = require(`../data-service`);

const category = require(`./category`);
const article = require(`./article`);
const search = require(`./search`);

const getMockData = require(`../lib/get-mock-data`);

const app = new Router();

(async () => {
  const mockData = await getMockData();
  category(app, new CategoryService(mockData));
  article(app, new ArticleService(mockData), new CommentService(mockData));
  search(app, new SearchService(mockData));
})();

module.exports = app;

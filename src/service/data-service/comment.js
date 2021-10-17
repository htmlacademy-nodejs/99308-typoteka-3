'use strict';

const {nanoid} = require(`nanoid`);
const {MAX_ID_LENGTH} = require(`../../constants`);

class CommentService {
  constructor(articles) {
    this._articles = articles;
  }

  async create(articleId, comment) {
    const newComment = {
      id: nanoid(MAX_ID_LENGTH),
      text: comment
    };
    const currentArticle = this._articles.find(
        (item) => item.id === articleId
    );
    currentArticle.comments.push(newComment);
    return newComment;
  }

  async drop(articleId, commentId) {
    const currentArticle = this._articles.find(
        (item) => item.id === articleId
    );
    const comment = currentArticle.comments.find(
        (item) => item.id === commentId
    );
    currentArticle.comments = currentArticle.comments.filter(
        (item) => item.id !== commentId
    );
    return comment;
  }

  async findAll(articleId) {
    const currentArticle = this._articles.find(
        (item) => item.id === articleId
    );
    return currentArticle.comments;
  }

}

module.exports = CommentService;

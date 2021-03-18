'use strict';

const generatePosts = (count) => (
  Array(count).fill({}).map(() => ({
    createdDate: Date.now()
  }))
);

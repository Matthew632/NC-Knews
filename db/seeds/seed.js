const {
  articleData, topicData, userData, commentData,
} = require('../data');

const { createRef, formatDate } = require('../../utils/seed_utils.js');

exports.seed = function (knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex('topics')
      .insert(topicData)
      .returning('*'))
    .then((insertedTopics) => {
      const topicInsertions = insertedTopics;
      const userInsertions = knex('users')
        .insert(userData)
        .returning('*');
      return Promise.all([topicInsertions, userInsertions]);
    })
    .then(([topicInsertions, userInsertions]) => {
      const articleInsertions = knex('articles')
        .insert(formatDate(articleData))
        .returning('*');
      return Promise.all([topicInsertions, userInsertions, articleInsertions]);
    })
    .then(([topicInsertions, userInsertions, articleInsertions]) => {
      console.log(createRef(articleInsertions, 'title', 'article_id'));
    });
};

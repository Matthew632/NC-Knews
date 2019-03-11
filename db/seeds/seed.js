const {
  articleData, topicData, userData, commentData,
} = require('../data');

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
    .then((topicInsertions, userInsertions) => {
      const articleInsertions = knex('articles')
        .insert(articleData)
        .returning('*');
      return Promise.all([topicInsertions, userInsertions, articleInsertions]);
    });
};

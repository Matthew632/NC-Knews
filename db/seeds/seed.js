const { articleData, topicData, userData, commentData } = require('../data');

exports.seed = function (knex, Promise) {
    return knex.migrate
        .rollback()
        .then(() => knex.migrate.latest())
        .then(() =>
            knex('topics')
                .insert(topicData)
                .returning('*'),
        )
};
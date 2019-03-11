
exports.up = function (knex, Promise) {
  console.log('creating the comments table...');
  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id').primary();
    commentsTable.string('author').references('username').inTable('users');
    // commentsTable.string('article_id').references('article_id').inTable('articles');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.date('created_at').defaultTo(knex.fn.now());
    commentsTable.string('body');
  });
};

exports.down = function (knex, Promise) {

};

// Each comment should have:

//     comment_id which is the primary key
//     author field that references a user's primary key (username)
//     article_id field that references an article's primary key
//     votes defaults to 0
//     created_at defaults to the current date
//     body

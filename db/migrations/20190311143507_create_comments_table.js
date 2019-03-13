
exports.up = function (knex, Promise) {
  console.log('creating the comments table...');
  return knex.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id').primary();
    commentsTable.string('author').references('username').inTable('users');
    commentsTable.integer('article_id').references('article_id').inTable('articles').onDelete('cascade');
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.date('created_at').defaultTo(knex.fn.now());
    commentsTable.string('body', 100000);
  });
};

exports.down = function (knex, Promise) {
  console.log('removing the comments table...');
  return knex.schema.dropTable('comments');
};

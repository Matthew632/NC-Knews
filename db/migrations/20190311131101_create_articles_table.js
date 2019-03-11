
exports.up = function (knex, Promise) {
    console.log("creating the articles table...")
    return knex.schema.createTable('articles', articlesTable => {
        articlesTable.increments('article_id').primary();
        articlesTable.string('title').notNullable();
        articlesTable.string('body');
        articlesTable.integer('votes').defaultTo(0);
        articlesTable.string('topic').references('slug').inTable('topics');
        articlesTable.string('author').references('username').inTable('users');
        articlesTable.date('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function (knex, Promise) {
    console.log('removing the articles table...');
    return knex.schema.dropTable('articles');
};


// article_id which is the primary key
// title
// body
// votes defaults to 0
// topic field which references the slug in the articles table
// author field that references a user's primary key (username)
// created_at defaults to the current date

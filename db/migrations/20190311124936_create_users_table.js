
exports.up = function (knex, Promise) {
    console.log("creating the users table...")
    return knex.schema.createTable('users', usersTable => {
        usersTable.string('username').unique().primary();
        usersTable.string('avatar_url');
        usersTable.string('name');
    })
};

exports.down = function (knex, Promise) {
    console.log('removing the users table...');
    return knex.schema.dropTable('users');
};


// username which is the primary key & unique
// avatar_url
// name

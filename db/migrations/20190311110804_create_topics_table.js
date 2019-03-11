
exports.up = function (knex, Promise) {
    console.log("creating the topics table...")
    return knex.schema.createTable('topics', topicsTable => {
        topicsTable.string('slug').unique().primary();
        topicsTable.string('description');
    })
};

exports.down = function (knex, Promise) {
    console.log('removing the topics table...');
    return knex.schema.dropTable('topics');
};


// slug field which is a unique string that acts as the table's primary key
// description field which is a string giving a brief description of a given topic

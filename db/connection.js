
// const ENV = process.env.NODE_ENV || 'development';
// const connection = ENV === 'production'
//     ? { client: 'pg', connection: process.env.DATABASE_URL }
//     : require('../knexfile');

// module.exports = require('knex')(connection);


const ENV = process.env.NODE_ENV || 'development';
const config = ENV === 'production'
  ? { client: 'pg', connection: process.env.DATABASE_URL }
  : require('../knexfile');

module.exports = require('knex')(config);

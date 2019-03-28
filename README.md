# Northcoders News API

This RESTful API acts as a server for a database containing a system of upvoted articles and comments.

It is hosted online at:
https://nc-knews-server.herokuapp.com/

All available endpoints can be found on the `/api` path.

## Getting Started

To run the API and its tests locally first git clone this directory.

Secondly, create a 'knexfile.js' file in the root directory. Mac users should be to omit their PSQL username and password but be sure to include these if you are a Linux user, as below:

```js
const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'development';


const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

const customConfigs = {
  development: {
    connection: {
      production: {
        connection: `${DB_URL}?ssl=true`,
      },
      database: 'nc_knews',
      username: 'your-username-here',
      password: 'your-password-here',
    },
  },
  test: {
    connection: {
      database: 'nc_knews_test',
      username: 'your-username-here',
      password: 'your-password-here',
    },
  },
  production: {
    connection: `${DB_URL}?ssl=true`,
  }
};

module.exports = { ...baseConfig, ...customConfigs[ENV] };
```

Thirdly, run the following commands in your terminal to setup and seed the database:
```
npm run setup:dbs

npm run migrate-latest

npm run seed
```

Finally, run the `npm test` command to run the tests.

## Dependencies

The API relies on the below dependencies:

    body-parser v1.18.3
    express v4.16.4
    knex v0.15.2
    pg v7.6.1
    chai v4.2.0
    eslint v5.9.0
    eslint-config-airbnb v17.1.0
    eslint-plugin-import v2.14.0
    husky v1.1.4
    mocha v6.0.2
    supertest v3.4.2
    node v11.9.0
    npm v6.8.0

## Authors

Matthew Hebb - Northcoders




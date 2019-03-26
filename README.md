# BE2-NC-Knews

## Northcoders News API

To run locally you will have to create a 'knexfile.js' file in the root directory. Mac users should be to omit their PSQL username and password but be sure to include these if you are a Linux user, as below:

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

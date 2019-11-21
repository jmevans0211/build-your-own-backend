module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/happiness',
    useNullAsDefault: true,
    migrations: {
      directory: './db/migrations'
    }
  },
  seeds: {
    directory: './db/seeds/dev'
  }
};

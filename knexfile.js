module.exports = {
    client: 'postgresql',
    connection: {
      database: 'oclean',
      user:     'postgres',
      password: '1234'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  };
// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection:'postgres://localhost/todos_test', useNullAsDefault: true,
    migrations: {
    directory: "./database/migrations"
  },
  seeds: {
    directory: "./database/seeds"
  },
  },production: {
    client: "pg",
    connection:process.env.DATABASE_URL, useNullAsDefault: true,
    migrations: {
    directory: "./database/migrations"
  },
  seeds: {
    directory: "./database/seeds"
  },
  }
 ,
  
  pool: {
    afterCreate: (conn, done) => {
      // runs after a connection is made to the sqlite engine
      conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
    }
  }
};

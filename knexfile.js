// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
   
    connection: {
      host: '127.0.0.1',user:'postgres',password:'admin',
      database:'food'


   //   filename: "./database/foodie.db3" sqlite3
    }, useNullAsDefault: true,
    migrations: {
    directory: "./database/migrations"
  },
  seeds: {
    directory: "./database/seeds"
  },
  },
 
  
  pool: {
    afterCreate: (conn, done) => {
      // runs after a connection is made to the sqlite engine
      conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
    }
  }
};

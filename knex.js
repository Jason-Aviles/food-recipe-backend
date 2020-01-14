// Update with your config settings.	
require("dotenv").config();	

module.exports = {	
  development: {	
    client: "mysql",	
    connection: {	
      host:process.env.Host || "us-cdbr-iron-east-05.cleardb.net" ,	
      user:"b672d74aec5a80",	
      password: process.env.PASSWORD || "f90f8ab7",	
      database: process.env.DATABASE || "heroku_1d5e0accbded54b",	
      insecureAuth : true,	
      charset: "utf8"	
    },	
    useNullAsDefault: true	
  },	

  // staging: {	
  //   client: "mysql",	
  //   connection: {	
  //     host: process.env.host,	
  //     user: process.env.user,	
  //     password: process.env.password,	
  //     database: "ig_clone",	
  //     charset: "utf8"	
  //   },	
  //   useNullAsDefault: true	
  // },	
  pool: {	
    min: 2,	
    max: 10	
  },	
  migrations: {	
    tableName: "knex_migrations"	
  },	

  // production: {	
  //   client: "mysql",	
  //   connection: {	
  //     host: process.env.host,	
  //     user: process.env.user,	
  //     password: process.env.password,	
  //     database: "ig_clone",	
  //     charset: "utf8"	
  //   },	
  //   useNullAsDefault: true,	
  //   pool: {	
  //     min: 2,	
  //     max: 10	
  //   },	
  //   migrations: {	
  //     tableName: "knex_migrations"	
  //   }	
  // }	

  // For local testing	
  // testing: {	
  //   client: "mysql",	
  //   connection: {	
  //     host: process.env.host,	
  //     user: process.env.user,	
  //     password: process.env.password,	
  //     database: "lambdaStaging",	
  //     charset: "utf8",	
  //   useNullAsDefault: true,	
  // }	
};
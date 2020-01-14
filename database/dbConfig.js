const knex = require('knex');

const knexConfig = require('../knex');

module.exports = knex(knexConfig.development);

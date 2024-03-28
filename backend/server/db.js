const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/cafe_latte_db');


module.exports = {
  client,
  //createTables
};
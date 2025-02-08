const { Pool } = require("pg");

// All of the following properties should be read from environment variables
// We're hardcoding them here for simplicity
const pool = new Pool({
  host: "localhost", // or wherever the db is hosted
  user: 'postgres',
  database: "top_users",
  password: 'Kirat2008',
  port: 5432 // The default port
});

module.exports = pool
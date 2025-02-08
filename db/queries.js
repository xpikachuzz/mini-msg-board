const pool = require("./pool");

async function getAllMovies() {
  const { rows } = await pool.query("SELECT * FROM movies;");
  return rows;
}

async function getMovie(id) {
  const { rows } = await pool.query("SELECT * FROM movies WHERE id = $1;", [id]);
  return rows;
}

async function insertMovie(title, price, year, genres) {
  await pool.query("INSERT INTO movies (title, price, year, genres) VALUES ($1, $2, $3, $4);", [title, price, year, genres]);
}

async function updateMovie(id, title, price, year, genres) {
  await pool.query("UPDATE movies SET title = $1, price = $2, year = $3, genres = $4 WHERE id = $5;", [title, price, year, genres, id]);
}

async function deleteMovie(id) {
  await pool.query("DELETE FROM movies WHERE id=$1;", [id]);
}

// Messages & Users
async function getMessagesAndUsers() {
  console.log("USERS")
  const { rows } = await pool.query("SELECT * FROM users u RIGHT JOIN messages m ON u.id = m.user_id;");
  return rows;
}

// Messages
async function getMessages() {
  const { rows } = await pool.query("SELECT * FROM messages;");
  return rows;
}

async function getAnonMessages() {
  const { rows } = await pool.query("SELECT * FROM messages;");
  return rows.map((row) => ({username: "Anonymous", ...row}))
}

async function insertMessage(user_id, title, body) {
  console.log("res: ", user_id, title, body)
  await pool.query("INSERT INTO messages (user_id, title, body) VALUES ($1, $2, $3);", [user_id, title, body])
}




module.exports = {
  getAllMovies,
  insertMovie,
  updateMovie,
  getMovie,
  deleteMovie,
  getMessagesAndUsers,
  getMessages,
  getAnonMessages,
  insertMessage,
};
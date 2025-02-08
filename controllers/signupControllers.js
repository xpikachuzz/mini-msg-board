const pool = require("../db/pool");
const bcrypt = require('bcryptjs');


async function signupGET(req, res, next) {
  res.render("sign-up")
}

async function signupPOST(req, res, next) {
  try {
    // Check if username already exists
    const { rows } = await  pool.query("SELECT * FROM users WHERE username = $1", [req.body.username])
    if (rows.length) {
      console.log("User already exists")
      throw new Error('User already exists!');
    }

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      // if err, do something
      if (err) {
        throw new Error("didn't hash")
      }
      // otherwise, store hashedPassword in DB
      else {
        await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
          req.body.username,
          hashedPassword,
        ]);
      }
    });
    res.locals.currentUser = req.body.username
    
    res.redirect("/log-in");
  } catch(err) {
    return next(err);
  }
}



module.exports = {
  signupGET,
  signupPOST
};
// app.js
const path = require("node:path");

const express = require("express");
const app = express();    // initiate express.
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const signupRouter = require("./routes/signupRouter");
const loginRouter = require("./routes/loginRouter");
const pool = require("./db/pool");
const logoutRouter = require("./routes/logoutRouter");
const homeRouter = require("./routes/homeRouter");
const postMessageRouter = require("./routes/postMessageRouter");




// able to read ejs
app.set("view engine", "ejs");
// if it's false then it only accepts strings and arrays.
// can get param from ejs
app.use(express.urlencoded({ extended: true }));


// Passport setup
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];

      console.log("user: ", user)

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
});

// app usages.
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());


app.use("/log-in", loginRouter)

app.use("/log-out", logoutRouter)

// const { username, password } = req.query

app.use("/sign-up", signupRouter)

app.use("/post-message", postMessageRouter)

// if a GET request comes through the '/' path then pass the request throught the following chain of middleware functions.
app.get("/", homeRouter);


const PORT = process.env.PORT || 3000;

// Server will listen for incoming requests
app.listen(PORT, () => {
  console.log(`The website is in: localhost:${PORT}/`);
});


// node --watch app.js
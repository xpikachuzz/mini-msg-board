const passport = require("passport");
const db = require("../db/queries");

async function messagesGET(req, res, next) {
  // logged in then include usernames
  const messages =  (!req.user) ? await db.getAnonMessages() : await db.getMessagesAndUsers()
  req.messages = messages
  next()
}

async function homeGET(req, res) {
  res.render("home", {user: req.user, messages: req.messages})
}


async function homePOST(req, res, next) {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
}


module.exports = {
  homeGET,
  homePOST,
  messagesGET
};
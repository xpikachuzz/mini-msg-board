const passport = require("passport");
const db = require("../db/queries");

async function loginGET(req, res, next) {
  res.render("log-in")
}


module.exports = {
  loginGET,
};
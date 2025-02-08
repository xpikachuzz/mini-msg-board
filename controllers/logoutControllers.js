const passport = require("passport");
const db = require("../db/queries");

async function logoutPOST(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

module.exports = {
  logoutPOST
};
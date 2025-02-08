const db = require("../db/queries");

async function postMessageGET(req, res, next) {
  res.render("post-msg", {user: req.user})
}


async function postMessagePOST(req, res, next) {
  // console.log("Req: ", req.body.title)
  console.log("REQ: ID: ", !!req.body.body && !!req.body.title)
  if (req.body.title && req.body.body) {
    await db.insertMessage(req.user.id, req.body.title, req.body.body)
  }
  res.redirect("/");
}


module.exports = {
  postMessageGET,
  postMessagePOST
};
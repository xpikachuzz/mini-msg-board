// routes/newRouter.js
const { Router } = require("express");
const { loginGET } = require("../controllers/loginControllers");
const passport = require("passport");

const loginRouter = Router();

loginRouter.get("/", loginGET)

loginRouter.post("/", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/"
  })
)

// loginRouter.post("/", loginPOST)


module.exports = loginRouter
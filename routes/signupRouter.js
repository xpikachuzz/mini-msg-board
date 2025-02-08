// routes/newRouter.js
const { Router } = require("express");
const { signupGET, signupPOST } = require("../controllers/signupControllers");

const signupRouter = Router();

signupRouter.get("/", signupGET)

signupRouter.post("/", signupPOST)


module.exports = signupRouter
// routes/newRouter.js
const { Router } = require("express");
const { logoutPOST } = require("../controllers/logoutControllers");

const logoutRouter = Router();

logoutRouter.post("/", logoutPOST)


module.exports = logoutRouter
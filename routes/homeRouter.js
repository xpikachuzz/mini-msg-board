// routes/newRouter.js
const { Router } = require("express");
const { messagesGET, homeGET } = require("../controllers/homeControllers");

const homeRouter = Router();

homeRouter.get("/", messagesGET, homeGET)


module.exports = homeRouter
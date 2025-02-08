const { Router } = require("express");
const { postMessageGET, postMessagePOST } = require("../controllers/postMessageControllers");

const postMessageRouter = Router();

postMessageRouter.get("/", postMessageGET)
postMessageRouter.post("/", postMessagePOST)


module.exports = postMessageRouter
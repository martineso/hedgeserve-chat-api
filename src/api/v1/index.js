const router = require("express").Router();
const chatRouter = require("./routes/chat");

router.use("/chat", chatRouter);

module.exports = router;

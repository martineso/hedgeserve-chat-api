const express = require("express");
const router = express.Router();
const db = require("../../../db/models");

/**
 * Returns chat info
 */
router.get("/:chatId", async (req, res, next) => {
  const { chatId } = req.params;
  const user = await db.user.findAll();
  console.log(user);
  res.json({
    chatId
  });
});

/**
 * Deletes this chat
 */
router.delete("/:chatId", (req, res, next) => {
  const { chatId } = req.params;

  res.json({
    chatId
  });
});

/**
 * Returns all messages for this chat
 */
router.get("/:chatId/messages", (req, res, next) => {
  const { chatId, messageId } = req.params;

  res.json({
    chatId: req.params.chatId
  });
});

/**
 * Returns a single message
 */
router.get("/:chatId/messages/:messageId", (req, res, next) => {
  const { chatId, messageId } = req.params;

  res.json({
    chatId
  });
});

/**
 * Sends a single message
 */
router.post("/:chatId/messages", (req, res, next) => {
  const { messageId } = req.params;

  res.json({
    chatId
  });
});

/**
 * Deletes a single message
 */
router.delete("/:chatId/messages/:messageId", (req, res, next) => {
  const { messageId } = req.params;

  res.json({
    chatId
  });
});

module.exports = router;

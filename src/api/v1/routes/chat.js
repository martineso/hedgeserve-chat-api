const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const db = require("../../../db/models");
const Sequelize = db.Sequelize;

/**
 * Creates a chat with a single participant as the creator or a list of participants if passed
 * as parameter
 */
router.post("/", async (req, res, next) => {
  const { name, participants = [] } = req.body;

  const chat = await db.chat.create({ name });
  if (!chat) {
    return next(createError(500));
  }

  try {
    const chatParticipants = participants.map(participant => ({
      userId: participant,
      chatId: chat.id
    }));

    await db.chatParticipant.bulkCreate(chatParticipants);
  } catch (err) {
    if (err instanceof Sequelize.ForeignKeyConstraintError) {
      return next(createError(400, "Invalid params!"));
    }
  }

  res.status(201).json(chat);
});

/**
 * Returns chat info
 */
router.get("/:chatId", async (req, res, next) => {
  const { chatId } = req.params;

  const chat = await db.chat.findOne({
    where: { id: chatId },
    include: [
      {
        model: db.user,
        attributes: {
          exclude: ["createdAt", "updatedAt"]
        },
        through: {
          attributes: []
        }
      }
    ]
  });

  res.json(chat || {});
});

/**
 * Deletes this chat
 */
router.delete("/:chatId", async (req, res, next) => {
  const { chatId } = req.params;

  try {
    const result = await db.chat.destroy({ where: { id: chatId } });
    if (!result) {
      return next(createError(400, "Invalid chat id!"));
    }
  } catch (err) {
    return next(createError(500));
  }

  res.status(200).json();
});

/**
 * Returns all messages for this chat
 */
router.get("/:chatId/messages", (req, res, next) => {
  const { chatId } = req.params;

  const result = db.chat.findAll({
    where: {
      id: chatId
    }
  });

  res.json({
    result
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
router.post("/:chatId/messages", async (req, res, next) => {
  const { chatId } = req.params;
  const { message, recepientId, senderId = 1 } = req.body;

  const result = db.message.create({
    from: senderId,
    text: message,
    chatId
  });

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

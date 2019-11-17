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
  const { name, authorId, participants = [] } = req.body;

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
    } else if (err instanceof Sequelize.DatabaseError) {
      return next(createError(500));
    }
  }

  res.status(201).json(chat);
});

/**
 * Adds a list of participants to the selected chat
 */
router.put("/:chatId/participants", async (req, res, next) => {
  const { chatId } = req.params;
  const { participants = [] } = req.body;

  const chatParticipants = participants.map(participant => ({
    userId: participant,
    chatId
  }));

  try {
    await db.chatParticipant.bulkCreate(chatParticipants);
  } catch (err) {
    if (err instanceof Sequelize.ForeignKeyConstraintError) {
      return next(createError(400, "Invalid participant or invalid chatId!"));
    }
  }

  res.status(201).json();
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

  let status = 200;
  if (!chat) {
    status = 204;
  }

  res.status(status).json(chat || {});
});

/**
 * Deletes a chat
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
 * Returns all messages for a chat
 */
router.get("/:chatId/messages", async (req, res, next) => {
  const { chatId } = req.params;

  const result = await db.message.findAll({
    where: {
      chatId
    }
  });

  let status = 200;
  if (!result) {
    status = 204;
  }

  res.status(status).json(result);
});

/**
 * Sends a single message to the specified chat
 */
router.post("/:chatId/messages", async (req, res, next) => {
  const { chatId } = req.params;
  const { text, senderId } = req.body;

  if (!senderId) {
    return next(createError(400, "Param [senderId] is required!"));
  }

  if (!text || !("" + text).trim()) {
    return next(createError(400, "Param [text] is required!"));
  }

  let message = null;
  try {
    message = await db.message.create({
      from: senderId,
      text,
      chatId
    });
  } catch (err) {
    console.log(err);
    return next(createError(400, "Invalid params!"));
  }

  res.status(201).json(message);
});

/**
 * Deletes a single message
 */
router.delete("/:chatId/messages/:messageId", async (req, res, next) => {
  const { messageId } = req.params;

  try {
    const result = await db.message.destroy({
      where: {
        id: messageId
      }
    });

    if (!result) {
      return next(createError(400, "Invalid message id!"));
    }
  } catch (err) {
    return next(createError(500));
  }

  res.status(204).json();
});

module.exports = router;

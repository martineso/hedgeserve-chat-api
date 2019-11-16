module.exports = (sequelize, DataTypes) => {
  const ChatMessage = sequelize.define(
    "chatMessage",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      chatId: {},
      messageId: {},
      from: {},
      to: {}
    },
    {
      freezeTableName: true
    }
  );

  return ChatMessage;
};

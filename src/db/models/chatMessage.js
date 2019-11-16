module.exports = (sequelize, DataTypes) => {
  const ChatMessage = sequelize.define(
    "chatMessage",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      messageId: DataTypes.INTEGER,
      from: DataTypes.INTEGER,
      to: DataTypes.INTEGER
    },
    {}
  );

  return ChatMessage;
};

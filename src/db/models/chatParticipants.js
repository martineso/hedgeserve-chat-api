module.exports = (sequelize, DataTypes) => {
  const ChatParticipant = sequelize.define(
    "chatParticipant",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: DataTypes.INTEGER,
      chatId: DataTypes.INTEGER
    },
    {}
  );

  return ChatParticipant;
};

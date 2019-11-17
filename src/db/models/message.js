module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "message",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      text: DataTypes.TEXT,
      from: DataTypes.INTEGER,
      chatId: DataTypes.INTEGER
    },
    {}
  );

  Message.associate = models => {
    Message.belongsTo(models.chatParticipant, {
      foreignKey: "from",
      targetKey: "id"
    });

    Message.belongsTo(models.chat, {
      foreignKey: "chatId"
    });
  };
  return Message;
};

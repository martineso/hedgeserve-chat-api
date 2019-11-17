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
    Message.hasMany(models.chatParticipant, {
      foreignKey: "chatId"
    });
  };
  return Message;
};

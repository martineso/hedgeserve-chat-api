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

  ChatParticipant.associate = models => {
    ChatParticipant.hasMany(models.message, {
      foreignKey: "from"
    });

    ChatParticipant.belongsTo(models.user, {
      foreignKey: "userId"
    });
  };
  return ChatParticipant;
};

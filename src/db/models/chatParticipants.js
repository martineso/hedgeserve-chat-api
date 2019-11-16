module.exports = (sequelize, DataTypes) => {
  const ChatParticipant = sequelize.define(
    "chatParticipant",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      chatId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {}
  );

  //   ChatParticipant.associate = models => {
  //     ChatParticipant.hasMany(models.user);
  //   };

  return ChatParticipant;
};

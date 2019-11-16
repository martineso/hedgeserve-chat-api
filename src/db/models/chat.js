module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define(
    "chat",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.TEXT
    },
    {}
  );

  Chat.associate = models => {
    Chat.belongsToMany(models.user, {
      through: "chatUser",
      foreignKey: "userId"
    });
  };

  return Chat;
};

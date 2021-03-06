const Sequalize = require("sequelize").Sequelize;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstName: {
        type: DataTypes.STRING,
        unique: false
      },
      lastName: {
        type: DataTypes.STRING,
        unique: false
      }
    },
    {}
  );

  User.associate = models => {
    User.belongsToMany(models.chat, {
      through: models.chatParticipant,
      foreignKey: "userId",
      otherKey: "chatId"
    });

    User.hasOne(models.chatParticipant, {
      foreignKey: "userId"
    });
  };

  return User;
};

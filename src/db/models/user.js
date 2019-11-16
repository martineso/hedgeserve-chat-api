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
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING
    },
    {}
  );

  User.associate = models => {
    User.belongsToMany(models.chat, {
      through: "chatUser",
      foreignKey: "userId"
    });
  };

  return User;
};

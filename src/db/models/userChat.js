module.exports = (sequelize, DataTypes) => {
  const UserChat = sequelize.define(
    "userChat",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    },
    {
      freezeTableName: true
    }
  );

  return UserChat;
};

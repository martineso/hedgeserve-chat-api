module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "message",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      text: DataTypes.TEXT
    },
    {}
  );

  return Message;
};

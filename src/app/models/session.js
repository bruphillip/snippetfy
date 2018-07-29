const Session = (sequelize, DataTypes) => {
  const session = sequelize.define('Sessions', {
    sid: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    expires: DataTypes.DATE,
    data: DataTypes.TEXT,
  });

  return session;
};

module.exports = Session;

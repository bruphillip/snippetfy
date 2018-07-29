const User = (sequelize, DataTypes) => {
  const user = sequelize.define('Users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  user.associate = (models) => {
    user.hasMany(models.Category);
  };

  return user;
};

module.exports = User;

const Category = (sequelize, DataTypes) => {
  const category = sequelize.define('Category', {
    title: DataTypes.STRING,

  });

  category.associate = (models) => {
    category.belongsTo(models.Users);
    category.hasMany(models.Snippet);
  };

  return category;
};

module.exports = Category;

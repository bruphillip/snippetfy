module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Sessions', {
      sid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      expires: DataTypes.STRING,
      data: DataTypes.TEXT,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    queryInterface.dropTables('Sessions');
  },
};

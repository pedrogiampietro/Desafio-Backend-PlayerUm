module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define(
    'Place',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      views: {
        type: DataTypes.STRING,
        defaultValue: '',
        allowNull: false,
      },
      likes_count: {
        type: DataTypes.JSON,
        defaultValue: [],
      },
    },
    { freezeTableName: true }
  )

  Place.associate = (models) => {
    // Place.belongsTo(models.User, { foreignKey: 'email' })
    Place.belongsTo(models.Account, { foreignKey: 'accountId' })
  }

  return Place
}

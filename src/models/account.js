module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jwtVersion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    passwordResetToken: {
      type: DataTypes.STRING,
      select: false,
    },
    passwordResetExpires: {
      type: DataTypes.DATE,
      select: false,
    },
  })

  Account.associate = (models) => {
    // Account.hasOne(models.User, { foreignKey: 'email' })
    Account.hasMany(models.Place, { foreignKey: 'accountId' })
  }

  Account.prototype.toJSON = function () {
    const values = { ...this.get() }
    delete values.password
    return values
  }

  return Account
}

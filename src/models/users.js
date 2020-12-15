module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		location: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '',
		},
		profileName: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: '',
		},
		avatar: {
			type: DataTypes.STRING,
			validate: {
				isString(val) {
					if (typeof val !== 'string') {
						throw new sequelize.ValidationError('Avatar must be a string.')
					}
				},
			},
		},
	})

	User.associate = (models) => {
		User.belongsTo(models.Account, { foreignKey: 'email' })
	}

	return User
}

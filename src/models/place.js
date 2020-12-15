module.exports = (sequelize, DataTypes) => {
	const Place = sequelize.define('Place', {
		title: {
			type: DataTypes.STRING,
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
	})

	Place.associate = (models) => {
		Place.belongsTo(models.User, { foreignKey: 'id' })
	}

	return Place
}

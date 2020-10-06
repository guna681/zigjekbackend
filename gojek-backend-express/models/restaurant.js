/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restaurant', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		image: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		tag: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		isPureVeg: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		isOfferAvailable: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		costForTwo: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		isExculsive: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		isFavourite: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		isPromoted: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		existLogin: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: 0
		},
		keywords: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		averageRating: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: 0
		}
	}, {
		sequelize,
		tableName: 'restaurant'
	});
};

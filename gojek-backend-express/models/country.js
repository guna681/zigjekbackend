/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('country', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		countryName: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		isoCode: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		currencyCode: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		currencySymbol: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		currencyValues: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		status: {
			type: DataTypes.STRING(25),
			allowNull: false
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'country'
	});
};

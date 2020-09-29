/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('providerservice', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		ProviderId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		CategoryId: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		SubCategoryId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		Experience: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		PricePerHour: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: 0
		},
		QuickPitch: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ""
		},
		CreateAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.fn('current_timestamp')
		},
		UpdateAt: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'providerservice'
	});
};

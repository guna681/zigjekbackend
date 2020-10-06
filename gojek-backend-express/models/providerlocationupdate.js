/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('providerlocationupdate', {
		ProviderId: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		S2CellId: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		Latitude: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		Longitude: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		Bearing: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		RideTypeId: {
			type: 'LONGTEXT',
			allowNull: true
		},
		IsDeliveryOpt: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: 0
		},
		IsPoolActive: {
			type: DataTypes.STRING(3),
			allowNull: true,
			defaultValue: "no"
		},
		IsPoolEnabled: {
			type: DataTypes.STRING(3),
			allowNull: true,
			defaultValue: "no"
		},
		MaxPoolCapacity: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: 4
		},
		Status: {
			type: DataTypes.STRING(11),
			allowNull: true,
			defaultValue: "active"
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
		tableName: 'providerlocationupdate'
	});
};

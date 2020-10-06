/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('providervehicle', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		ProviderId: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		VehicleImage: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		VehicleBrandName: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		VehicleModelName: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		RideVehicleTypeId: {
			type: 'LONGTEXT',
			allowNull: true
		},
		VehicleNumber: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		Year: {
			type: 'YEAR(4)',
			allowNull: true
		},
		Color: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		Status: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		IsActive: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		CreateAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('current_timestamp')
		},
		UpdateAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.fn('current_timestamp')
		}
	}, {
		sequelize,
		tableName: 'providervehicle'
	});
};

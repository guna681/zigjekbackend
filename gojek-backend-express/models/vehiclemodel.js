/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('vehiclemodel', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		VehicleBrandId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		ModelName: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		VehicleType: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		PowerBy: {
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
		tableName: 'vehiclemodel'
	});
};

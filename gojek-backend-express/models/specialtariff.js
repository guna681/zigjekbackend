/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('specialtariff', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		Name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Distance: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		MinCharge: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		MaxCharge: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		FromHours: {
			type: DataTypes.TIME,
			allowNull: true
		},
		ToHours: {
			type: DataTypes.TIME,
			allowNull: true
		},
		RideTypeId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		CountryId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		RideVechicleTypeId: {
			type: DataTypes.INTEGER(11),
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
		tableName: 'specialtariff'
	});
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ridetariff', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		RideTypeId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		RideVechicleTypeId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		Distance: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		MinCharges: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		MaxCharges: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		CountryId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		LanguageId: {
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
		tableName: 'ridetariff'
	});
};

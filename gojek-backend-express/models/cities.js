/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('cities', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		CountryId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		StateId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		CityName: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		IsActive: {
			type: DataTypes.STRING(3),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'cities'
	});
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ridetype', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		Name: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		Description: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		CountryId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'ridetype'
	});
};

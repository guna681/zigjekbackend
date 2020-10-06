/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ridevehicletypelanguage', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		LanguageId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		RideVechileType: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		Name: {
			type: DataTypes.STRING(45),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'ridevehicletypelanguage'
	});
};

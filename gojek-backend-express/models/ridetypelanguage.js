/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ridetypelanguage', {
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
		Name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		RideTypeId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'ridetypelanguage'
	});
};

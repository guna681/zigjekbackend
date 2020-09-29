/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('language', {
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
		ShortCode: {
			type: DataTypes.STRING(45),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'language'
	});
};

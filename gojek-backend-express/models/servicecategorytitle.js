/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('servicecategorytitle', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		CategoryId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		SubCategoryId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		Title: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		Status: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: 1
		}
	}, {
		sequelize,
		tableName: 'servicecategorytitle'
	});
};

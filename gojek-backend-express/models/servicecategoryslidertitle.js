/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('servicecategoryslidertitle', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true
		}
	}, {
		sequelize,
		tableName: 'servicecategoryslidertitle'
	});
};

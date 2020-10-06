/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('mysql_migrations_347ertt3e', {
		timestamp: {
			type: DataTypes.STRING(254),
			allowNull: false
		}
	}, {
		sequelize,
		tableName: 'mysql_migrations_347ertt3e'
	});
};

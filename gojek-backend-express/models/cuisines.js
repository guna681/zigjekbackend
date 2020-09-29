/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('cuisines', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'cuisines'
	});
};

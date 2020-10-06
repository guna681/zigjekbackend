/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('setting', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		key: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		value: {
			type: DataTypes.STRING(255),
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
		tableName: 'setting'
	});
};

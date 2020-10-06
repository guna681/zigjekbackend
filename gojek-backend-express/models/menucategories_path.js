/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('menucategories_path', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		categoryId: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		pathId: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		level: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		deleted_at: {
			type: DataTypes.DATE,
			allowNull: true
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
		tableName: 'menucategories_path'
	});
};

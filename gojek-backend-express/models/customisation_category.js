/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('customisation_category', {
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
		outletId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: {
					tableName: 'outlets',
				},
				key: 'id'
			}
		},
		type: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: 0
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
		tableName: 'customisation_category'
	});
};

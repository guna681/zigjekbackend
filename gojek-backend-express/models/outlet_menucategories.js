/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('outlet_menucategories', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		restaurantId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true
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
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		parentId: {
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
		tableName: 'outlet_menucategories'
	});
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('dishes_customisation', {
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
		price: {
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: "no description"
		},
		isVeg: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		dishId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: {
					tableName: 'dishes',
				},
				key: 'id'
			}
		},
		customisationCategoryId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: {
					tableName: 'dishes_customisation_categories',
				},
				key: 'id'
			}
		},
		selected: {
			type: DataTypes.INTEGER(11),
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
		tableName: 'dishes_customisation'
	});
};

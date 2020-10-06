/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('restaurant_cuisines', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		outletId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		cuisineId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
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
		tableName: 'restaurant_cuisines'
	});
};

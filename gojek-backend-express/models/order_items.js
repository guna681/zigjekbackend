/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('order_items', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		orderId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		dishId: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		dishName: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		quantity: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		isVeg: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		price: {
			type: DataTypes.DOUBLE,
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
		tableName: 'order_items'
	});
};

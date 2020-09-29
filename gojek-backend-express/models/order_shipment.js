/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('order_shipment', {
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
		deliveryStaffId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		orderStatus: {
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
		tableName: 'order_shipment'
	});
};

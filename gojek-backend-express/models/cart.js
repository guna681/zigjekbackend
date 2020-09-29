/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('cart', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		userId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true
		},
		udId: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		restaurantId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: true
		},
		outletId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		dishId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		customisationId: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		itemPrice: {
			type: DataTypes.DOUBLE,
			allowNull: true
		},
		quantity: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		uuId: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		orderId: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: "0"
		},
		deliveryaddressId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		couponName: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: " "
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
		tableName: 'cart'
	});
};

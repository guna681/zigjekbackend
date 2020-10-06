/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('couponcode', {
		Id: {
			autoIncrement: true,
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true
		},
		Discount: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			defaultValue: 0.00
		},
		Type: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Coupon: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Status: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Description: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Threshold: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: 0
		},
		MinValueToRedeem: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: 0
		},
		MaxValueToRedeem: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: 0
		},
		RedeemableType: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		ValidFrom: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		ValidTo: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		CreateAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.fn('current_timestamp')
		},
		UpdateAt: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'couponcode'
	});
};

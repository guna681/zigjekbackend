/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('couponredeemed', {
		Id: {
			autoIncrement: true,
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true
		},
		UserId: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		Amount: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		DiscountAmount: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Status: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: "pending"
		},
		BookingId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
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
		tableName: 'couponredeemed'
	});
};

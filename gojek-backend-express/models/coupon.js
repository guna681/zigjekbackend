/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('coupon', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		couponName: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		couponCode: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		discountPerscentage: {
			type: DataTypes.STRING(5),
			allowNull: false
		},
		maxDiscount: {
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		dateStart: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		dateEnd: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: 0
		},
		couponImage: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		outletId: {
			type: DataTypes.INTEGER(45),
			allowNull: false
		},
		couponStatus: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: 0
		},
		isDeleted: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: 0
		}
	}, {
		sequelize,
		tableName: 'coupon'
	});
};

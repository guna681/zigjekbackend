/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('userpayment', {
		Id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		UserId: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		PaymentType: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		Data: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		CreateAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('current_timestamp')
		},
		UpdateAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.fn('current_timestamp')
		}
	}, {
		sequelize,
		tableName: 'userpayment'
	});
};

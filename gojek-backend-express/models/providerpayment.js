/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('providerpayment', {
		Id: {
			autoIncrement: true,
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true
		},
		PaymentField: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		Value: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		ProviderId: {
			type: DataTypes.BIGINT,
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
		tableName: 'providerpayment'
	});
};

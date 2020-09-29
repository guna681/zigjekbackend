/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('transaction', {
		Id: {
			autoIncrement: true,
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true
		},
		UserType: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		Description: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		UserTypeId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		Amount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		Type: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		Status: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: "pending"
		},
		WithdrawalId: {
			type: DataTypes.INTEGER(11),
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
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.fn('current_timestamp')
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'transaction'
	});
};

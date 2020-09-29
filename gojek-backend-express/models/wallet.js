/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('wallet', {
		Id: {
			autoIncrement: true,
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true
		},
		UserTypeId: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		UserType: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		CurrencyId: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		Secret: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Balance: {
			type: DataTypes.DECIMAL,
			allowNull: false,
			defaultValue: 0.00
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
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'wallet'
	});
};

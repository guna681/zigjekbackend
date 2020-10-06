/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('withdrawal', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		ProviderId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		Amount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		Status: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		TansactionId: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		CreateAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('current_timestamp')
		},
		UpdateAt: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'withdrawal'
	});
};

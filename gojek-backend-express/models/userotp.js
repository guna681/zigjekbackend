/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('userotp', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		Mobile: {
			type: DataTypes.STRING(15),
			allowNull: true
		},
		Ext: {
			type: DataTypes.STRING(5),
			allowNull: true
		},
		OTP: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		Type: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		Status: {
			type: DataTypes.STRING(10),
			allowNull: true,
			defaultValue: "pending"
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
		tableName: 'userotp'
	});
};

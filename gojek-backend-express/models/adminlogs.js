/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('adminlogs', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		action: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		Module: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		data: {
			type: 'LONGTEXT',
			allowNull: true
		},
		AdminId: {
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
		}
	}, {
		sequelize,
		tableName: 'adminlogs'
	});
};

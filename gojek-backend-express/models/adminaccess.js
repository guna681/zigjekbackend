/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('adminaccess', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		Modules: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		Roles: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		HasAccess: {
			type: DataTypes.STRING(3),
			allowNull: true,
			defaultValue: "No"
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
		tableName: 'adminaccess'
	});
};

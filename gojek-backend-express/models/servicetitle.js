/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('servicetitle', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		Title: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		Color: {
			type: DataTypes.STRING(11),
			allowNull: true
		},
		Status: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: 1
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
		tableName: 'servicetitle'
	});
};

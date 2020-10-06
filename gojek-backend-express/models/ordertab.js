/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ordertab', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		Type: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		Name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		Path: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		Key: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		UserType: {
			type: DataTypes.STRING(50),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'ordertab'
	});
};

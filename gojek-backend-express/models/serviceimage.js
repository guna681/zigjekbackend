/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('serviceimage', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		ServiceId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		Path: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		URL: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Type: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'serviceimage'
	});
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('servicegroupmapping', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		GroupId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		ServiceId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'servicegroupmapping'
	});
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('oauth_personal_access_clients', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		client_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
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
		tableName: 'oauth_personal_access_clients'
	});
};

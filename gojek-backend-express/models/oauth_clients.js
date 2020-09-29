/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('oauth_clients', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		user_id: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		secret: {
			type: DataTypes.STRING(100),
			allowNull: false
		},
		redirect: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		personal_access_client: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		},
		password_client: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		},
		revoked: {
			type: DataTypes.INTEGER(1),
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
		tableName: 'oauth_clients'
	});
};

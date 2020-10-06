/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('oauth_access_tokens', {
		id: {
			type: DataTypes.STRING(100),
			allowNull: false,
			primaryKey: true
		},
		user_id: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		client_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		scopes: {
			type: DataTypes.TEXT,
			allowNull: true
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
		},
		expires_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'oauth_access_tokens'
	});
};

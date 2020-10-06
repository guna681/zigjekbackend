/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('oauth_auth_codes', {
		id: {
			type: DataTypes.STRING(100),
			allowNull: false,
			primaryKey: true
		},
		user_id: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		client_id: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		scopes: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		revoked: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		},
		expires_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'oauth_auth_codes'
	});
};

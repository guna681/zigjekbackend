/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('oauth_refresh_tokens', {
		id: {
			type: DataTypes.STRING(100),
			allowNull: false,
			primaryKey: true
		},
		access_token_id: {
			type: DataTypes.STRING(100),
			allowNull: false
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
		tableName: 'oauth_refresh_tokens'
	});
};

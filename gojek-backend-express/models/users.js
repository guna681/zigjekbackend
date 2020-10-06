/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		Id: {
			autoIncrement: true,
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true
		},
		FirstName: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		LastName: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		Image: {
			type: 'LONGTEXT',
			allowNull: true
		},
		Email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true
		},
		Mobile: {
			type: DataTypes.STRING(15),
			allowNull: false,
			defaultValue: ""
		},
		Password: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		ExtCode: {
			type: DataTypes.STRING(5),
			allowNull: true
		},
		CountryId: {
			type: DataTypes.STRING(5),
			allowNull: false,
			defaultValue: ""
		},
		LoginType: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		IsMobileVerified: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		IsEmailVerified: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		Status: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		WalletId: {
			type: DataTypes.BIGINT,
			allowNull: true,
			unique: true
		},
		Rating: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			defaultValue: 0.0
		},
		StripeCustomerID: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		SocialToken: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Language: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		latitude: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		longitude: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		CurrentAddressId: {
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
			allowNull: true
		},
		deviceToken: {
			type: DataTypes.STRING(500),
			allowNull: true
		},
		os: {
			type: DataTypes.STRING(45),
			allowNull: true
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
		tableName: 'users'
	});
};

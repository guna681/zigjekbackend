/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('provider', {
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
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ""
		},
		Email: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true
		},
		Mobile: {
			type: DataTypes.STRING(15),
			allowNull: false,
			unique: true
		},
		Password: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ""
		},
		ExtCode: {
			type: DataTypes.STRING(5),
			allowNull: false
		},
		CountryId: {
			type: DataTypes.STRING(11),
			allowNull: false,
			defaultValue: ""
		},
		LoginType: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ""
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
			allowNull: true,
			defaultValue: ""
		},
		WalletId: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		MobileBrand: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		MobileModel: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		DeviceId: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		GCMId: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		AccessToken: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		AppVersion: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		OS: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		OSVersion: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		Latitude: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		Longitude: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		Bearing: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		S2CellId: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		Rating: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			defaultValue: 0.0
		},
		StripeAccountID: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		SocialToken: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		ActiveVehicleId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		VehicleBrand: {
			type: DataTypes.STRING(11),
			allowNull: true
		},
		VehicleModel: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		VehicleNumber: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Earnings: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			defaultValue: 0.00
		},
		IsActive: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		Language: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		TripCount: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: 0
		},
		IsDeliveryOpt: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: 0
		},
		Type: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		CreateAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('current_timestamp')
		},
		UpdateAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.fn('current_timestamp')
		}
	}, {
		sequelize,
		tableName: 'provider'
	});
};

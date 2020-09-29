/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('booking', {
		Id: {
			autoIncrement: true,
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true
		},
		UserId: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		UserDeviceId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		ProviderId: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		RideTypeId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		FromLocation: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		ToLocation: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		CancelledFor: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		SourceLat: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			defaultValue: 0.000000
		},
		SourceLong: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			defaultValue: 0.000000
		},
		DestinyLat: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			defaultValue: 0.000000
		},
		DestinyLong: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			defaultValue: 0.000000
		},
		S2CellId: {
			type: DataTypes.STRING(20),
			allowNull: true
		},
		Status: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		Distance: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		Estimation: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		CurrencyType: {
			type: 'LONGTEXT',
			allowNull: true
		},
		Tax: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			defaultValue: 0.00
		},
		WaitingCharges: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		TotalAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		Description: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		OutletName: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		ContactNo: {
			type: DataTypes.STRING(15),
			allowNull: true
		},
		CountryId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		CancelledBy: {
			type: DataTypes.STRING(11),
			allowNull: true
		},
		RideName: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		VehicleName: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		ProviderEarning: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		TotalEarning: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		PaymentMode: {
			type: DataTypes.STRING(10),
			allowNull: true,
			defaultValue: "cash"
		},
		CardId: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		IsActive: {
			type: DataTypes.STRING(11),
			allowNull: true,
			defaultValue: "yes"
		},
		ProviderRejectedIds: {
			type: 'LONGTEXT',
			allowNull: true
		},
		AssignedProviderIds: {
			type: 'LONGTEXT',
			allowNull: true
		},
		IsUserReviewed: {
			type: DataTypes.STRING(10),
			allowNull: true,
			defaultValue: "no"
		},
		IsCouponApplied: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: "no"
		},
		RedeemedId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		DiscountAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		CouponCode: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		BookingType: {
			type: DataTypes.STRING(50),
			allowNull: true,
			defaultValue: "now"
		},
		SeatCount: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: 0
		},
		EmailStatus: {
			type: DataTypes.STRING(5),
			allowNull: true,
			defaultValue: "no"
		},
		IsPool: {
			type: DataTypes.STRING(8),
			allowNull: true
		},
		BookingTimestamp: {
			type: DataTypes.DATE,
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
		},
		outletId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		netAmount: {
			type: DataTypes.DOUBLE,
			allowNull: true
		},
		orderReferenceId: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		orderStatus: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		deliverycharge: {
			type: DataTypes.DOUBLE,
			allowNull: true
		},
		deliveryAddressId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.fn('current_timestamp')
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.fn('current_timestamp')
		},
		lastMile: {
			type: DataTypes.STRING(45),
			allowNull: true,
			defaultValue: "0"
		},
		firstMile: {
			type: DataTypes.STRING(45),
			allowNull: true,
			defaultValue: "0"
		},
		eta: {
			type: DataTypes.DATE,
			allowNull: true
		},
		Type: {
			type: DataTypes.STRING(11),
			allowNull: true,
			defaultValue: "taxi"
		},
		serviceCommission: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: 0
		},
		ServiceCategoryId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		ServiceSubCategoryId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		ServiceGroupId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		ServiceStatuLogs: {
			type: 'LONGTEXT',
			allowNull: true
		},
		ServiceTimeSlot: {
			type: 'LONGTEXT',
			allowNull: true
		},
		ServiceStartImage: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		ServiceEndImage: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		ServiceIds: {
			type: 'LONGTEXT',
			allowNull: true
		},
		ServiceAddons: {
			type: 'LONGTEXT',
			allowNull: true
		},
		markReady: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: 0
		},
		deliveryStartTimeSlot: {
			type: DataTypes.DATE,
			allowNull: true
		},
		deliveryEndTimeSlot: {
			type: DataTypes.DATE,
			allowNull: true
		},
		prescriptionimageUrl: {
			type: DataTypes.STRING(1000),
			allowNull: true
		},
		confirmedTime: {
			type: DataTypes.DATE,
			allowNull: true
		},
		isRated: {
			type: DataTypes.STRING(45),
			allowNull: true,
			defaultValue: "NOTRATED"
		},
		orderSuggestions: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		paid_provider: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: 0
		},
		paid_outlet: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: 0
		},
		outletEarnings: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			defaultValue: 0.00
		}
	}, {
		sequelize,
		tableName: 'booking'
	});
};

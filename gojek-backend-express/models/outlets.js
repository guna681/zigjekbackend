/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('outlets', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		restaurantId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: {
					tableName: 'restaurant',
				},
				key: 'id'
			}
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		password: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		image: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		isPureVeg: {
			type: DataTypes.INTEGER(4),
			allowNull: false
		},
		costForTwo: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		isExculsive: {
			type: DataTypes.INTEGER(12),
			allowNull: true
		},
		isOfferAvailable: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: 0
		},
		preparationTime: {
			type: DataTypes.INTEGER(25),
			allowNull: true
		},
		deliveryCharges: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			defaultValue: 20.00
		},
		addressLineOne: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		addressLineTwo: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		street: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ""
		},
		area: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ""
		},
		city: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ""
		},
		state: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ""
		},
		country: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		zipcode: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		latitude: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		longitude: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		s2CellId: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		s2key: {
			type: DataTypes.CHAR(20),
			allowNull: true
		},
		contactNumber: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		restaurantCommission: {
			type: DataTypes.DOUBLE,
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: 1
		},
		existLogin: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: 1
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		totalAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			defaultValue: 0.00
		},
		balanceAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			defaultValue: 0.00
		},
		serviceCommission: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: 0
		},
		averageRating: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: 0
		},
		isBlocked: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: 0
		},
		deviceToken: {
			type: DataTypes.STRING(500),
			allowNull: true
		},
		os: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		type: {
			type: DataTypes.STRING(45),
			allowNull: true,
			defaultValue: "0"
		},
		packingCharge: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: 0
		},
		cuisine: {
			type: DataTypes.STRING(1000),
			allowNull: true,
			defaultValue: "[]"
		}
	}, {
		sequelize,
		tableName: 'outlets'
	});
};

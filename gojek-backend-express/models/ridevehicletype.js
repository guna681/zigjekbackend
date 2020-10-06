/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('ridevehicletype', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		RideTypeId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		Name: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		IconPassive: {
			type: 'LONGTEXT',
			allowNull: true
		},
		IconActive: {
			type: 'LONGTEXT',
			allowNull: true
		},
		CountryId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		StateIds: {
			type: 'LONGTEXT',
			allowNull: true
		},
		CityIds: {
			type: 'LONGTEXT',
			allowNull: true
		},
		BaseCharge: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		MinCharge: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			comment: 'As per KM'
		},
		CurrencyType: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		CommissionPercentage: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		WaitingCharge: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		Capacity: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		ShortDesc: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		LongDesc: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		IsActive: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		IsPoolEnabled: {
			type: DataTypes.STRING(3),
			allowNull: true,
			defaultValue: "no"
		},
		CreateAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('current_timestamp')
		},
		UpdateAt: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'ridevehicletype'
	});
};

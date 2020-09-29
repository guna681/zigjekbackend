/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('service', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		CategoryId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		SubCategoryId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		SubTitle: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		Name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		Image: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Price: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		IsFixedPrice: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		},
		PricePerHour: {
			type: DataTypes.DECIMAL,
			allowNull: false
		},
		Status: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		},
		Limit: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: 2
		},
		SlashPrice: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		CurrencyType: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: "$"
		},
		Commission: {
			type: DataTypes.DECIMAL,
			allowNull: true,
			defaultValue: 0.00
		},
		Description: {
			type: 'LONGTEXT',
			allowNull: true
		},
		Duration: {
			type: DataTypes.STRING(50),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'service'
	});
};

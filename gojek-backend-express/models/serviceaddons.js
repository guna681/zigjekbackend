/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('serviceaddons', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		CategroyId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		SubCategoryId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		GroupId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		TitleId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		Name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		Price: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		CurrencyType: {
			type: DataTypes.STRING(11),
			allowNull: true
		},
		IsFixedPrice: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		PricePerHour: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		Status: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: 1
		}
	}, {
		sequelize,
		tableName: 'serviceaddons'
	});
};

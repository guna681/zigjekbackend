/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('servicecategory', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		TitleId: {
			type: DataTypes.INTEGER(50),
			allowNull: true
		},
		Name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		Type: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		Icon: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Status: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: 1
		},
		HasSubCategory: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: 0
		},
		IsFixedPricing: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: 0
		},
		PricePerHour: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		DisplayType: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		DisplayDescription: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		UpdateAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		CreateAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.fn('current_timestamp')
		}
	}, {
		sequelize,
		tableName: 'servicecategory'
	});
};

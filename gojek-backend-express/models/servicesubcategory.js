/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('servicesubcategory', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		CategoryId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		Name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		Image: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Status: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: 1
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
		ServicesDisplayStyle: {
			type: DataTypes.INTEGER(1),
			allowNull: true,
			defaultValue: 1
		},
		CategorySlideTitle: {
			type: DataTypes.STRING(255),
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
		}
	}, {
		sequelize,
		tableName: 'servicesubcategory'
	});
};

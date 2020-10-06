/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tax', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		Name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Percentage: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		CountryId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		IsActive: {
			type: DataTypes.STRING(3),
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
		tableName: 'tax'
	});
};

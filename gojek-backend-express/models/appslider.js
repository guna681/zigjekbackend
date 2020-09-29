/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('appslider', {
		Id: {
			autoIncrement: true,
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true
		},
		Title: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		Description: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Image: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Type: {
			type: DataTypes.STRING(10),
			allowNull: true,
			defaultValue: "user"
		},
		CreateAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.fn('current_timestamp')
		},
		UpdateAt: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'appslider'
	});
};

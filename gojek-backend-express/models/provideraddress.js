/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('provideraddress', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		ProviderId: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		Address1: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Address2: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		City: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		Province: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Landmark: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ""
		},
		Latitude: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		Longitude: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		ZipCode: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		Status: {
			type: DataTypes.INTEGER(1),
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
		tableName: 'provideraddress'
	});
};

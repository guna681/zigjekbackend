/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('userdevices', {
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
		Brand: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ""
		},
		Model: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ""
		},
		DeviceId: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true
		},
		GCMId: {
			type: 'LONGTEXT',
			allowNull: true
		},
		AccessToken: {
			type: 'LONGTEXT',
			allowNull: true
		},
		AppVersion: {
			type: DataTypes.STRING(10),
			allowNull: true,
			defaultValue: ""
		},
		OS: {
			type: DataTypes.STRING(10),
			allowNull: true,
			defaultValue: ""
		},
		OSVersion: {
			type: DataTypes.STRING(10),
			allowNull: true,
			defaultValue: ""
		},
		Latitude: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		Longitude: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		SocketId: {
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
		tableName: 'userdevices'
	});
};

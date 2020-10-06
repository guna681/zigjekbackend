/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('address', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		userId: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		location: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		houseFlatNo: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ""
		},
		landMark: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: ""
		},
		fullAddress: {
			type: DataTypes.STRING(500),
			allowNull: true
		},
		type: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		unSaved: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: 0
		},
		latitude: {
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		longitude: {
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		addressType: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		currentAddress: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: 0
		},
		isDeleted: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: 0
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'address'
	});
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('appconfig', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		FieldName: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		Value: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Type: {
			type: DataTypes.STRING(10),
			allowNull: true,
			defaultValue: "provider"
		},
		CreateAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		UpdateAt: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'appconfig'
	});
};

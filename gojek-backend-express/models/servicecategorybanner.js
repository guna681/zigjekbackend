/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('servicecategorybanner', {
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
		SubCategoryId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		Text: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		Type: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		Path: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		URL: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Status: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: 1
		}
	}, {
		sequelize,
		tableName: 'servicecategorybanner'
	});
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('servicecategoryslide', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
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
		Image: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		Text: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		Status: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: 1
		}
	}, {
		sequelize,
		tableName: 'servicecategoryslide'
	});
};

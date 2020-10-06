/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('serviceaddonstitle', {
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
		GroupId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		Name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		Type: {
			type: DataTypes.STRING(11),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'serviceaddonstitle'
	});
};

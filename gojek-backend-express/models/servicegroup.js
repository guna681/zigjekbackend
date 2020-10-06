/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('servicegroup', {
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
		Name: {
			type: DataTypes.STRING(50),
			allowNull: false,
			defaultValue: ""
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
		tableName: 'servicegroup'
	});
};

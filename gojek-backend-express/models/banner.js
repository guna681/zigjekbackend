/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('banner', {
		Id: {
			autoIncrement: true,
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true
		},
		Title: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Image_path: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Description: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Url: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Status: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		CreateAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.fn('current_timestamp')
		},
		UpdateAt: {
			type: DataTypes.DATE,
			allowNull: true
		},
		hasSubCategory: {
			type: DataTypes.STRING(45),
			allowNull: true,
			defaultValue: "1"
		}
	}, {
		sequelize,
		tableName: 'banner'
	});
};

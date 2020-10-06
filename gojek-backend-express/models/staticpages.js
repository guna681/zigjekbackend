/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('staticpages', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		PageName: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		Url: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		HtmlContent: {
			type: 'LONGTEXT',
			allowNull: true
		},
		CreateAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('current_timestamp')
		},
		UpdateAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.fn('current_timestamp')
		},
		Type: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'staticpages'
	});
};

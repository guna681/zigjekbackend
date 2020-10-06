/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('emailtemplate', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		KeyWord: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		Type: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		Template: {
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
		Variables: {
			type: 'LONGTEXT',
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'emailtemplate'
	});
};

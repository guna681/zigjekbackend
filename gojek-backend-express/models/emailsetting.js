/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('emailsetting', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		templateName: {
			type: DataTypes.STRING(800),
			allowNull: false
		},
		template: {
			type: 'LONGTEXT',
			allowNull: false
		},
		Token: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		key: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: 0
		},
		default: {
			type: DataTypes.INTEGER(11),
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
		tableName: 'emailsetting'
	});
};

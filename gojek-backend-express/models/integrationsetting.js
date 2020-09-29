/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('integrationsetting', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		key: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		value: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		type: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		image: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: 0
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: true
		},
		paymentType: {
			type: DataTypes.STRING(45),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'integrationsetting'
	});
};

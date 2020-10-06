/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('order_items_customization', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		orderItemId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		dishCustomisationId: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		dishCustomisationName: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		price: {
			type: DataTypes.DOUBLE,
			allowNull: false
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
		tableName: 'order_items_customization'
	});
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('cart_customisations', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		cartId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		dishId: {
			type: DataTypes.INTEGER(100),
			allowNull: true
		},
		dishCustomisationId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
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
		tableName: 'cart_customisations'
	});
};

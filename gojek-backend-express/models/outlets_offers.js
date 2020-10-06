/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('outlets_offers', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		outletId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false
		},
		OfferType: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		OfferName: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		discount: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		dateStart: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		dateEnd: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER(11),
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
		tableName: 'outlets_offers'
	});
};

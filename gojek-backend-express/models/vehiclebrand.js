/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('vehiclebrand', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		BrandName: {
			type: DataTypes.STRING(45),
			allowNull: true,
			unique: true
		},
		CountryId: {
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
		}
	}, {
		sequelize,
		tableName: 'vehiclebrand'
	});
};

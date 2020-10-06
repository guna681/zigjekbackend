/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('state', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		CountryId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		ShortCode: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		StateName: {
			type: DataTypes.STRING(45),
			allowNull: true,
			unique: true
		},
		IsActive: {
			type: DataTypes.STRING(3),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'state'
	});
};

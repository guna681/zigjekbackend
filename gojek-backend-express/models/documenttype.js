/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('documenttype', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		Name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		Type: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		FieldName: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		ApplicableTo: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		IsRequired: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
			defaultValue: 1
		},
		DocType: {
			type: DataTypes.STRING(50),
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'documenttype'
	});
};

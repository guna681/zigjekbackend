/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('providervehicledocument', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		ProviderId: {
			type: DataTypes.BIGINT,
			allowNull: true
		},
		ProviderVehicleId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		DocumentTypeId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		File: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Value: {
			type: DataTypes.STRING(100),
			allowNull: true
		},
		Status: {
			type: DataTypes.INTEGER(1),
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
		tableName: 'providervehicledocument'
	});
};

/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('providerdocuments', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		DocTypeId: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		ProviderId: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		Value: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ""
		},
		Status: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		file: {
			type: DataTypes.STRING(255),
			allowNull: false
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
		tableName: 'providerdocuments'
	});
};

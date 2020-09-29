/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('peekcharges', {
		Id: {
			autoIncrement: true,
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true
		},
		Name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		Type: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		Week: {
			type: 'LONGTEXT',
			allowNull: true
		},
		Day: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		StartTime: {
			type: DataTypes.TIME,
			allowNull: true
		},
		EndTime: {
			type: DataTypes.TIME,
			allowNull: true
		},
		Fare: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		MinAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		MaxAmount: {
			type: DataTypes.DECIMAL,
			allowNull: true
		},
		Status: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		CreateAt: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.fn('current_timestamp')
		},
		UpdateAt: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'peekcharges'
	});
};

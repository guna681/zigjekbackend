/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('timeslot', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		Day: {
			type: DataTypes.STRING(3),
			allowNull: true
		},
		Time: {
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
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'timeslot'
	});
};

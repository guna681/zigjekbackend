/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('review', {
		Id: {
			autoIncrement: true,
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true
		},
		UserId: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		ProviderId: {
			type: DataTypes.BIGINT,
			allowNull: false
		},
		BookingId: {
			type: DataTypes.INTEGER(11),
			allowNull: true
		},
		Rating: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		},
		Comments: {
			type: 'LONGTEXT',
			allowNull: false
		},
		ReviewedBy: {
			type: DataTypes.STRING(45),
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
		tableName: 'review'
	});
};

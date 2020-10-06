/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('outlets_offerbanners', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		outletId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: {
					tableName: 'outlets',
				},
				key: 'id'
			}
		},
		bannerImages: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		deleted_at: {
			type: DataTypes.DATE,
			allowNull: true
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
		tableName: 'outlets_offerbanners'
	});
};

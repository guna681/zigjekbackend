/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('admin', {
		Id: {
			autoIncrement: true,
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true
		},
		FirstName: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		LastName: {
			type: DataTypes.STRING(45),
			allowNull: true
		},
		Username: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Email: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Password: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		Roles: {
			type: DataTypes.INTEGER(11),
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
		tableName: 'admin'
	});
};

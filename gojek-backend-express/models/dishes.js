/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('dishes', {
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
		name: {
			type: DataTypes.STRING(255),
			allowNull: false
		},
		image: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		tag: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: "2"
		},
		price: {
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		slashedPrice: {
			type: DataTypes.DOUBLE,
			allowNull: false
		},
		quantity: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		description: {
			type: DataTypes.STRING(255),
			allowNull: false,
			defaultValue: "no description"
		},
		isRecommended: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: 0
		},
		categoryId: {
			type: DataTypes.INTEGER(10).UNSIGNED,
			allowNull: false,
			references: {
				model: {
					tableName: 'outlet_menucategories',
				},
				key: 'id'
			}
		},
		isVeg: {
			type: DataTypes.INTEGER(11),
			allowNull: false
		},
		showFromTime: {
			type: DataTypes.TIME,
			allowNull: false
		},
		showToTime: {
			type: DataTypes.TIME,
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: 0
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
		},
		isCustomisation: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: 0
		}
	}, {
		sequelize,
		tableName: 'dishes'
	});
};

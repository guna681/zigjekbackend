module.exports = {
    'up': `CREATE TABLE Outlet_MenuCategories (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  restaurantId int(10) unsigned DEFAULT NULL,
  outletId int(10) unsigned NOT NULL,
  name varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  description varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  status tinyint(4) NOT NULL,
  parentId tinyint(4) NOT NULL DEFAULT '0',
  deleted_at datetime DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY outlet_menucategories_restaurantid_index (restaurantId),
  KEY outlet_menucategories_outletid_index (outletId),
  CONSTRAINT outlet_menucategories_outletid_foreign FOREIGN KEY (outletId) REFERENCES Outlets (id) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
    'down': 'DROP TABLE Outlet_MenuCategories'
}
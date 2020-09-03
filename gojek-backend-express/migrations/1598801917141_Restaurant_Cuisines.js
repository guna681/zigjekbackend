module.exports = {
    'up': `CREATE TABLE Restaurant_Cuisines (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  outletId int(10) unsigned NOT NULL,
  cuisineId int(10) unsigned NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
    'down': 'DROP TABLE Restaurant_Cuisines'
}
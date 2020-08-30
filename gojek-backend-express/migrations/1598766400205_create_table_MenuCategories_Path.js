module.exports = {
    'up': `CREATE TABLE MenuCategories_Path (
  id int(11) NOT NULL AUTO_INCREMENT,
  categoryId int(11) NOT NULL,
  pathId int(11) NOT NULL,
  level int(11) NOT NULL,
  deleted_at datetime DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=477 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
    'down': 'DROP TABLE MenuCategories_Path'
}
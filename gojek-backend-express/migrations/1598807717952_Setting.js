module.exports = {
    'up': `CREATE TABLE Setting (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  key varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  value varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
    'down': 'DROP TABLE Setting'
}
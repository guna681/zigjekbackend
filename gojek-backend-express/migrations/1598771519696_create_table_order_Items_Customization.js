module.exports = {
  'up': `CREATE TABLE order_Items_Customization (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  orderItemId int(10) unsigned NOT NULL,
  dishCustomisationId int(11) NOT NULL,
  dishCustomisationName varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  price double(8,2) NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  'down': 'DROP TABLE order_Items_Customization'
}

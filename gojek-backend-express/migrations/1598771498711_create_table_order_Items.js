module.exports = {
    'up': `CREATE TABLE order_Items (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  orderId int(10) unsigned NOT NULL,
  dishId int(11) NOT NULL,
  dishName varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  quantity int(11) NOT NULL,
  isVeg varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  price double(8,2) NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
    'down': 'DROP TABLE order_Items'
}
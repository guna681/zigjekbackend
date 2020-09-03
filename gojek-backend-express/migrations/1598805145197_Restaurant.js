module.exports = {
    'up': `CREATE TABLE Restaurant (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  email varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  password text COLLATE utf8mb4_unicode_ci,
  image varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  tag varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  isPureVeg tinyint(4) DEFAULT NULL,
  isOfferAvailable tinyint(4) DEFAULT NULL,
  costForTwo varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  isExculsive tinyint(4) DEFAULT NULL,
  isFavourite tinyint(4) DEFAULT NULL,
  isPromoted tinyint(4) DEFAULT NULL,
  existLogin tinyint(11) NOT NULL DEFAULT '0',
  keywords tinyint(4) DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  averageRating int(11) DEFAULT '0',
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
    'down': 'DROP TABLE Restaurant'
}
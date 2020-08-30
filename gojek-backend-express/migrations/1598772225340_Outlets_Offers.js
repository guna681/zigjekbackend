module.exports = {
    'up': `CREATE TABLE Outlets_Offers (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  outletId int(10) unsigned NOT NULL,
  OfferType varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  OfferName varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  discount varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  dateStart date NOT NULL,
  dateEnd date NOT NULL,
  status int(11) NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
    'down': 'DROP TABLE Outlets_Offers'
}
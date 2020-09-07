module.exports = {
  'up': `CREATE TABLE Outlets_OfferBanners (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  outletId int(10) unsigned NOT NULL,
  bannerImages varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  status int(11) NOT NULL,
  deleted_at datetime DEFAULT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY outlets_offerbanners_outletid_foreign (outletId),
  CONSTRAINT outlets_offerbanners_outletid_foreign FOREIGN KEY (outletId) REFERENCES Outlets (id)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  'down': 'DROP TABLE Outlets_OfferBanners'
}

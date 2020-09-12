module.exports = {
  'up': `CREATE TABLE oauth_personal_access_clients (
  id int(10) unsigned NOT NULL AUTO_INCREMENT,
  client_id int(10) unsigned NOT NULL,
  created_at timestamp NULL DEFAULT NULL,
  updated_at timestamp NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY oauth_personal_access_clients_client_id_index (client_id)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  'down': 'DROP TABLE oauth_personal_access_clients'
}

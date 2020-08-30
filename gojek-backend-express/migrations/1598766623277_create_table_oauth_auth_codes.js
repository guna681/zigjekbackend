module.exports = {
    'up': `CREATE TABLE oauth_auth_codes (
  id varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  user_id bigint(20) NOT NULL,
  client_id int(10) unsigned NOT NULL,
  scopes text COLLATE utf8mb4_unicode_ci,
  revoked tinyint(1) NOT NULL,
  expires_at datetime DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
    'down': 'DROP TABLE oauth_auth_codes'
}
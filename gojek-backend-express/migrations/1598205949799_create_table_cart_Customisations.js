module.exports = {
  'up': `CREATE TABLE Cart_Customisations (
    id bigint(20) NOT NULL AUTO_INCREMENT,
    cartId INT(10) DEFAULT NULL,
    dishId INT(100) DEFAULT NULL,
    dishCustomisationId INT(10) NOT NULL,
    created_at timestamp NOT DEFAULT CURRENT_TIMESTAMP,                
    updated_at timestamp NOT DEFAULT CURRENT_TIMESTAMP,
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
  'down': `DROP TABLE Cart_Customisations`
}

module.exports = {
  'up': `CREATE TABLE Cuisines (
    Id bigint(20) NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    status TINYINT(4) NOT NULL,
    created_at timestamp NOT DEFAULT CURRENT_TIMESTAMP,                
    updated_at timestamp NOT DEFAULT CURRENT_TIMESTAMP,
    )ENGINE=InnoDB DEFAULT CHARSET=utf8;`,
  'down': `DROP TABLE Cuisines`
}

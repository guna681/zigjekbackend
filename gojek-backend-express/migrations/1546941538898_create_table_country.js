module.exports = {
  'up': `CREATE TABLE Country (
        Id int(11) NOT NULL AUTO_INCREMENT,
        CountryName varchar(45) UNIQUE DEFAULT NULL,
        isoCode varchar(45) NOT NULL,
        currencyCode varchar(255) Not NULL,
        currencySymbol varchar(255) Not NULL,
        CurrenyValue varchar(255) Not NULL,
        status varchar(255) Not NULL,
        PRIMARY KEY (Id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8`,
  'down': 'DROP TABLE Country'
}

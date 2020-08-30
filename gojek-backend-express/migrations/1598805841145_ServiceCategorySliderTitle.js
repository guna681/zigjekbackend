module.exports = {
    'up': `CREATE TABLE ServiceCategorySliderTitle (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1`,
    'down': 'DROP TABLE ServiceCategorySliderTitle'
}
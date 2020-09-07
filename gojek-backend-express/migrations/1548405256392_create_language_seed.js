module.exports = {
  'up': `INSERT INTO Language (Name, ShortCode) VALUES 
    ('English','default'),
    ('Spanish','es'),
    ('Arabic','ar'),
    ('Portuguese','pt');`,
  'down': `DELETE FROM Language`
}

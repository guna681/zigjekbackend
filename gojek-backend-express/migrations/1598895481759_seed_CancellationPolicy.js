module.exports = {
  'up': `INSERT INTO CancellationPolicy (Description, UserType, CreateAt, UpdateAt) VALUES
        ('Customer not picking', 'provider', '2019-01-30 18:19:53', '2019-02-07 09:52:23'),
        ('Changed my mind', 'user', '2019-01-30 18:19:53', '2019-02-07 09:52:30'),
        ('My plan has changed', 'user', '2019-01-30 18:19:53', '2019-02-07 09:52:35'),
        ('Waiting for long time', 'provider', '2019-01-30 18:19:53', '2019-02-07 09:52:43'),
        ('Wrong destination', 'user', '2019-01-30 18:19:53', '2019-02-13 20:09:00'),
        ('No response', 'provider', '2019-01-30 18:19:53', '2019-02-13 20:09:07'),
        ('wrong info', 'user', '2019-01-30 18:19:53', '2019-02-13 20:09:10');`,
  'down': `DELETE FROM CancellationPolicy`
}

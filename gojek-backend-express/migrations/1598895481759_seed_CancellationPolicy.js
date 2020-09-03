module.exports = {
  'up': `INSERT INTO CancellationPolicy (Id, Description, UserType, CreateAt, UpdateAt) VALUES
        (1, 'Customer not picking', 'provider', '2019-01-30 18:19:53', '2019-02-07 09:52:23'),
        (2, 'Changed my mind', 'user', '2019-01-30 18:19:53', '2019-02-07 09:52:30'),
        (3, 'My plan has changed', 'user', '2019-01-30 18:19:53', '2019-02-07 09:52:35'),
        (4, 'Waiting for long time', 'provider', '2019-01-30 18:19:53', '2019-02-07 09:52:43'),
        (5, 'Wrong destination', 'user', '2019-01-30 18:19:53', '2019-02-13 20:09:00'),
        (6, 'No response', 'provider', '2019-01-30 18:19:53', '2019-02-13 20:09:07'),
        (7, 'wrong info', 'user', '2019-01-30 18:19:53', '2019-02-13 20:09:10');`,
  'down': `DELETE FROM CancellationPolicy`
}

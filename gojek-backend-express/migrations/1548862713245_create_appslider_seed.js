module.exports = {
  'up': `INSERT INTO AppSlider (Title, Description, Image, Type, CreateAt, UpdateAt) VALUES
        ('Access to rides, on demand', 'For clear navigation options to cashless payments, the app is desgined to help people get to their destinations.', 'intro_0.png', 'user', '2019-01-30 18:19:53', '2019-02-07 09:52:23'),
        ('Access to rides, on demand', 'For clear navigation options to cashless payments, the app is desgined to help people get to their destinations.', 'intro_1.png', 'user', '2019-01-30 18:19:53', '2019-02-07 09:52:30'),
        ('Access to rides, on demand', 'For clear navigation options to cashless payments, the app is desgined to help people get to their destinations.', 'intro_2.png', 'user', '2019-01-30 18:19:53', '2019-02-07 09:52:35'),
        ('Access to rides, on demand', 'For clear navigation options to cashless payments, the app is desgined to help people get to their destinations.', 'intro_3.png', 'user', '2019-01-30 18:19:53', '2019-02-07 09:52:43'),
        ('Access to rides, on demand', 'For clear navigation options to cashless payments, the app is desgined to help people get to their destinations.', 'intro_0.png', 'provider', '2019-01-30 18:19:53', '2019-02-13 20:09:00'),
        ('Access to rides, on demand', 'For clear navigation options to cashless payments, the app is desgined to help people get to their destinations.', 'intro_1.png', 'provider', '2019-01-30 18:19:53', '2019-02-13 20:09:07'),
        ('Access to rides, on demand', 'For clear navigation options to cashless payments, the app is desgined to help people get to their destinations.', 'intro_2.png', 'provider', '2019-01-30 18:19:53', '2019-02-13 20:09:10'),
        ('Access to rides, on demand', 'For clear navigation options to cashless payments, the app is desgined to help people get to their destinations.', 'intro_3.png', 'provider', '2019-01-30 18:19:53', '2019-02-13 20:08:45');`,
  'down': `DELETE FROM AppSlider`
}

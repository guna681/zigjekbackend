module.exports = {
  'up': `INSERT INTO StaticPages (Id, PageName, Url, HtmlContent, CreateAt, UpdateAt) VALUES
        (1, 'Terms and Condition', 'http://friendsservice.net/Terminos/terminosycondiciones.html', '<!DOCTYPE html>
<html>
<body>

<p>Terms and conditions</p>

</body>
</html>', '2019-01-30 18:19:53', '2019-02-07 09:52:23'),
(2, 'Privacy Policy', 'http://friendsservice.net/Privacy/privacy.html', '<!DOCTYPE html>
<html>
<body>

<p>Privacy Policy</p>


</body>
</html>', '2019-01-30 18:19:53', '2019-02-07 09:52:23'),
(3, 'About Us', 'http://friendsservice.net/Support/support.html', '<!DOCTYPE html>
<html>
<body>

<p>About Us</p>

</body>
</html>', '2019-01-30 18:19:53', '2019-02-07 09:52:23');`,
  'down': `DELETE FROM StaticPages`
}

module.exports = {
  'up': `INSERT INTO EmailTemplate (Id, KeyWord, Type, Template , CreateAt, UpdateAt , Variables) VALUES
        (1, 'WELCOME', 'user', '<html>
<head>
	<title>Welcome</title>
</head>
<body>
<h1>Welcome to Zigjek. Single Stop for all your on demand needs
</h1>
</body>
</html>' '2019-01-30 18:19:53', '2019-02-07 09:52:23', '["firstname", "lastname"]'),
        (2, 'PROVIDER', 'provider', '<!DOCTYPE html>
<html>
<head>
	<title>Page Title</title>
</head>
<body>
<h1>This is a Heading</h1>

<p>This is a paragraph.</p>
</body>
</html>' '2019-01-30 18:19:53', '2019-02-07 09:52:23', '["firstname", "lastname"]'),
        (3, 'INVOICE', 'user', '<body bgcolor="dimgray">
<table align="center" border="6" cellpadding="1" cellspacing="3" width="300" style="border-collapse: collapse;">
<br>
 <tr>
  <td>
<font size="5" color="white" face="Arial Rounded MT">
<center>
   Hello User
  </td>
 </tr>
<tr><td><b><center><font size="6" color="red" face="Latin""><marquee>Welcome to Static Pages</b></td></tr>
</table>
<br><br>
<center><img src="http://139.59.55.166/taxi/assets/img/taxi-ico/Group%20756.png"></img</center>
</body>' '2019-01-30 18:19:53', '2019-02-07 09:52:23', '["username", "source", "destination", "ridedate", "ridename", "distance", "triptime", "name", "year", "basefare", "time", "tax", "subtotal", "paymentmode", "paymentcharge", "userimage", "triprating"]');`,
  'down': `DELETE FROM EmailTemplate`
}

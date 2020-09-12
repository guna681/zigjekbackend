module.exports = {
  'up': `INSERT INTO IntegrationSetting (name, key, value, type , image , status , created_at, updated_at, paymentType) VALUES
        ('AndroidGoogleMapkey', 'androidmapKey', 'AIzaSyB6XpezvzSPSSR5-A3GFayqfdLU-kSicXw', 'googleMapKey', '', '0', '2019-01-30 18:19:53', '2019-02-07 09:52:23', ''),
        ('IosGoogleMapkey', 'iosMapKey', 'AIzaSyDvj4IR9p7qY_fSYo1v9iGZzcT_KPnd6EM', 'googleMapKey', '', '0', '2019-01-30 18:19:53', '2019-02-07 09:52:23', ''),
        ('otpLogin', 'otpLogin', '1', 'LoginType', '', '0', '2019-01-30 18:19:53', '2019-02-07 09:52:23', ''),
        ('passwordLogin', 'passwordLogin', '1', 'LoginType', '', '0', '2019-01-30 18:19:53', '2019-02-07 09:52:23', ''),
        ('Stripe', 'Stripe', 'sk_test_AL8gaTGt3r7vPHbgnWIbFR4H006UNryDcI', 'PaymentGateway', 'PaymentGateway/stripe.png', '0', '2019-01-30 18:19:53', '2019-02-07 09:52:23', ''),
        ('fireBase', 'FireBasekey', 'AAAAPAodkos:APA91bHtExSjCZZiWMVUudSLV86e7danb5mnZ2HSj9X-WOBjtDhDASdwHDCrpenuMXq3MHHYSWmYp1j7SUAcNuS1vczjDqqhuiXoRmWdzwmpQXxi8Csd7qBPfskExRdMYHPIHych5MzT', 'PushNotification', '', '1', '2019-01-30 18:19:53', '2019-02-07 09:52:23', ''),
        ('Twilio', 'Twilio', 'aC9G5fq6Lyh4K3fyJw5R03lAEblYJ3Gw', 'SMSGateWay', '', '0', '2019-01-30 18:19:53', '2019-02-07 09:52:23', ''),
        ('paypal', 'paypal', 'APP-80W284485P519543T', 'PaymentGateway', 'PaymentGateway/paypal.png', '0', '2019-01-30 18:19:53', '2019-02-07 09:52:23', ''),
        ('BROWSERKEY', 'BrowserKey', 'AIzaSyB3FuY8O9CleDz3wEeqKXf5c5qNOi5fNdw', 'googleKey', '', '0', '2019-01-30 18:19:53', '2019-02-07 09:52:23', ''),
        ('CashOnDelivery', 'CashOnDelivery', 'AIzaSyB3FuY8O9CleDz3wEeqKXf5c5qNOi5fNdw', 'PaymentGateway', 'PaymentGateway/cash.png', '1', '2019-01-30 18:19:53', '2019-02-07 09:52:23', 'cash'),
        ('Card', 'Card', 'AIzaSyB3FuY8O9CleDz3wEeqKXf5c5qNOi5fNdw', 'PaymentGateway', 'PaymentGateway/cash.png', '0', '2019-01-30 18:19:53', '2019-02-07 09:52:23', 'Card'),
        ('ManualAssign', 'ManualAssign', '1', 'ManualAssign', '', '1', '2019-01-30 18:19:53', '2019-02-07 09:52:23', ''),
        ('wallet', 'wallet', '1', 'PaymentGateway', 'PaymentGateway/wallet.png', '0', '2019-01-30 18:19:53', '2019-02-07 09:52:23', '');`,
  'down': `DELETE FROM IntegrationSetting`
}

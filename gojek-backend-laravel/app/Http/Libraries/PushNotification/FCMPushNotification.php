<?php


namespace  App\Http\Libraries\PushNotification;

class FCMPushNotification
{


    var $url = 'https://fcm.googleapis.com/fcm/send';



    public function setServerApiKey($serverApiKey)
    {
        $this->serverApiKey = $serverApiKey;
    }


    public function setDeviceId($deviceId)
    {
        $this->deviceId =array($deviceId);
    }


    public function setNotificationContent($content)
    {
        $this->content = $content;
    }


    function send()
    {


        $fields = $this->content;


        $headers = array('Authorization: key=' . $this->serverApiKey,
                         'Content-Type: application/json'
                        );

        // Open connection
        $ch      = curl_init();

        // Set the url, number of POST vars, POST data
        curl_setopt( $ch, CURLOPT_URL, $this->url );

        curl_setopt( $ch, CURLOPT_POST, true );
        curl_setopt( $ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt( $ch, CURLOPT_RETURNTRANSFER, true );

        curl_setopt( $ch, CURLOPT_POSTFIELDS, json_encode( $fields ) );

        // Avoids problem with https certificate
        curl_setopt( $ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false);

        // Execute post
        $result = curl_exec($ch);

        // Close connection
        curl_close($ch);


        return $result;

    }




}
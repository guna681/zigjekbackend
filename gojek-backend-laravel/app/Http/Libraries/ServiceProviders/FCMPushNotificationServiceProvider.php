<?php

namespace App\Http\Libraries\ServiceProviders;

use App\Http\Libraries\PushNotification\FCMPushNotification;
use App\Http\Repository\IntegrationSettingRepository;
use App\Http\Utility\Constant;
use Validator;


Class FCMPushNotificationServiceProvider
{

    //set Notification title

    public function setTitle($title)
    {
        $this->title = $title;
    }



    public function sendPushNotification($arg)
    {

        $integrationSetting  = new IntegrationSettingRepository();
        $serverApiKey   =$integrationSetting->getkeyValue(Constant::FIREBASE_KEY);
        $deviceToken    = $arg['deviceToken'];
        $os             = $arg['os'];
        $notificationContent = ('ios' === strtolower($os)) ? $this->buildIosNotification($arg) : $this->buildAndroidNotification($arg);
        $gcpm = new FCMPushNotification();
        $gcpm->setDeviceId($deviceToken);
        $gcpm->setServerApiKey($serverApiKey);
        $gcpm->setNotificationContent($notificationContent);
        $result = $gcpm->send();

        return $result;
    }

    //androidNotification
    public function buildAndroidNotification($data)
    {

        $fields = [
                   'registration_ids'  => [$data['deviceToken']],
                   'sound'		       => 'default',
                   'vibrate'	       => 'default',
                   // 'data'              => [
                   //                          "message"   => $data['message'],
                   //                          "image"     => $data['body']['image'],
                   //                          "title"     => $this->title,
                   //                          "notification_type"=>$data['body']['notification_type'],
                   //                           $data['body']['extraKey'] =>$data['body']['extraValue']
                   //                       ],
                   'data'              => [
                                            "message"   => $data['message'],
                                            // "image"     => $data['body']['image'],
                                            "title"     => $this->title,
                                            "notification_type"=>$data['body'],
                                            "orderId"=>$data['orderId'],
                                            "notifyType"=>'newOrder',
                                             // $data['body']['extraKey'] =>$data['body']['extraValue']
                                         ],                   
                  ];
        return $fields;
    }

    public function buildIosNotification($data)
    {

        // $msgbody =[
        //             "notification_type"             =>$data['body']['notification_type'],
        //             $data['body']['extraKey']       =>$data['body']['extraValue']
        //           ];     
        $msg['sound']   = 'default';
        $msg['icon']    = '@drawable/icon';
        $msg['title']   = $this->title;
        $msg['body']    = $data['body'];    
        $fields         = [
                            'registration_ids'  => [$data['deviceToken']],
                            'data'              => [
                                                    "message" => $data['message'],
                                                    "image"   => "false"],
                            'content_available' => true,
                            'priority'          => 'high',
                            'badge'             => 1,
                            'sound'             => 'default',
                            'notification'      => $msg
                            ];

        return $fields;
    }






}
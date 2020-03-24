<?php 

namespace App\Http\Libraries\ServiceProviders;
use App\Oauthclients;
use App\Http\Libraries\Message91\MSG91;

Class MessageServiceProvider{
    public static  function sendsmsOtp($value){
        $msg91=new MSG91();
        $data=$msg91->sendSMS($value);      
        return $data;
    }
}
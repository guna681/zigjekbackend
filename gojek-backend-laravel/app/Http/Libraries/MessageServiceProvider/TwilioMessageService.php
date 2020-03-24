<?php

namespace App\Http\Utility;
use App\Setting;
use Authy;
use App\Http\Repository\IntegrationSettingRepository;

final class TwilioProvider {

	
	public static function getOtp($mobile,$cc){         
        $integrationSettingRepository = new IntegrationSettingRepository();
        $authy_key = $integrationSettingRepository->getkeyValue(Constant::Twilio);
		if($mobile && $cc)
     {
        $authy_api = new Authy\AuthyApi($authy_key);
        $verification =$authy_api->phoneVerificationStart($mobile, $cc , 'sms');
        if($verification->ok()){
             $response=false;       
        }else{
             $response=true;  
        }

     } else {
         $response=true;   
     }
     return $response;
	}
	
	public static function verifyOtp($mobile,$cc,$otp){
        $integrationSettingRepository = new IntegrationSettingRepository();
        $authy_key = $integrationSettingRepository->getkeyValue(Constant::Twilio);
		if($mobile && $cc && $otp)
     {
        $authy_api = new Authy\AuthyApi($authy_key);

        $verification =$authy_api->phoneVerificationCheck($mobile, $cc, $otp);

        if($verification->ok()){
               $response=false;
        
        } else {
               $response=true;         
        }
       
     } else {
        $response=true;        
     }
     return $response;
	}
	
}
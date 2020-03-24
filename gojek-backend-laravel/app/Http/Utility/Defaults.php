<?php

namespace App\Http\Utility;
use App\Setting;
use Authy;

final class Defaults{

	public static function  encode($data){
		$encodedata=json_encode($data);
		return $encodedata;
	}

	public static function otpnumber(){
		$otpnumber = mt_rand(100000, 999999);
   		return $otpnumber;
   	}
	
	public function imageUpload($image,$pathName){

		$filesize = filesize($image);
		$fileName = $image->getClientOriginalName();
		$fileExtension   = $image->getClientOriginalExtension();
		$fileName        = 'image'.rand(11111, 99999) . '.' . $fileExtension;
		$destinationPath = 'images/'.$pathName;
		$upload_success  = $image->move($destinationPath, $fileName);
		$images          = $pathName.'/'.$fileName;


		return $images;
	}   

	public static function getOtp($mobile,$cc){
		if($mobile && $cc)
     {
        $authy_api = new Authy\AuthyApi('82e3cb8542b9b8ad827e1a545bf4d3d8');
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
		if($mobile && $cc && $otp)
     {
        $authy_api = new Authy\AuthyApi('authy_key');

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
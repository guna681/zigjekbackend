<?php
namespace App\Http\Repository;
use App\Setting;
use App\IntegrationSetting;
use DB;

class SettingRepostitory{
	
    public function  loginSetting(){
		$data=Setting::where('key','isOtpLogin')->first();
		return $data->value;
    }	
    public function  resendOtpTime(){
		$data=Setting::where('key','resendOtpTime')->first();
		return $data->value;
	}


	public  function  getValue($key){
		$setting=Setting::where('key',$key )->value('value');
		return  $setting;
		
	}

	public function updateSettingValue($data){
		DB::beginTransaction();
		try{
		  $data=Setting::where('key',$data->settingKey)->update(['value'=>$data->settingValue]);		   

		}catch(\Illuminate\Database\QueryException $ex){
			$jsonresp=$ex->getMessage();
			DB::rollBack();
			return false;
		}
		DB::commit();
		return true;

	}
	

	public function getIntegrationValue($key){
		$integrationSetting=IntegrationSetting::where('key',$key)->value('value');
		return $integrationSetting;
	}
	
	public function termsConditions(){
			$data=Setting::where('key','termsConditions')->first();
			return $data->value;
	}

}

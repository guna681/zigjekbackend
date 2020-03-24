<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Guzzle\Http\Exception\ServerErrorResponseException;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Service\UserCouponService;
use App\Http\Repository\CouponRepostitory;


Class  CouponController extends Controller
{
	public function  userCouponList(request $request){
		
	     $response=UserCouponService::couponList();	    
	     $responsedata=Defaults::encode($response);
    	 return $responsedata;
	}


	public function userCouponAdd(request $request){
		$userid=Auth::guard('api')->user()->id;
		$data=$request->all();
		$validate=self::couponvalidate($data);		
		if(!$validate){
			$response=UserCouponService::couponAdd($data,$userid);
		}else{
			$response=$validate;
		}
		$responsedata=Defaults::encode($response);
		return $responsedata;
	}

	public  function  userCouponDelete(request $request){
		$userid=Auth::guard('api')->user()->id;
		$response=UserCouponService::couponDelete($userid);	
		$responsedata=Defaults::encode($response);
		return $responsedata;
	}

	//validations

	private function  couponvalidate($data){
		$validate=array();
		if(empty($data['couponCode'])){
			$validate['error']=Common::error_true;
			$validate['error_message']=Common::error_manadatory;
		}
		if(!CouponRepostitory::getCouponcode($data['couponCode']))
		{
			$validate['error']=Common::error_true;
			$validate['error_message']=Common::text_nocoupon;
		}
    	return $validate;
	}






}	
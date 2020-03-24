<?php

namespace App\Http\Service;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Guzzle\Http\Exception\ServerErrorResponseException;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Repository\UserRepository;
use App\Http\Repository\CouponRepostitory;
use App\Http\DTO\CartDTO;
use App\User;

Class CouponService{

	public static function couponList(){
		$couponsdetails=CouponRepostitory::getCoupon();		
		if($couponsdetails){
			$data['error']=Common::error_false;
			$data['error_message']=Common::error_iscoupon;
			$data['couponDetails']=array();			
			foreach($couponsdetails as $coupons){
				$coupon['couponId']=$coupons['id'];
				$coupon['couponDescription']=$coupons['couponName'];
				$coupon['couponcode']=$coupons['code'];
				$coupon['coupontype']=$coupons['type'];
				$coupon['coupondiscount']=$coupons['discount'];
				$coupon['couponRules']=array();
				$coupondescriptions=CouponRepostitory::getCoupondescription($coupons['id']);
				foreach($coupondescriptions as $coupondescription){
					$couponrule=$coupondescription['couponRules'];
					array_push($coupon['couponRules'],$couponrule);
				}
				array_push($data['couponDetails'],$coupon);
			}
			
		}else{
			$data['error']=Common::error_true;
			$data['error_message']=Common::error_nocoupon;
			$data['couponDetails']=array();
		}

		return $data;
	}

	public static function  couponAdd($arg,$userid){
		$coupondetails=CouponRepostitory::addCoupon($arg,$userid);
		if($coupondetails){
			$data['error']=Common::error_false;
			$data['error_message']=Common::text_iscoupon;			
		}else{
			$data['error']=Common::error_true;
			$data['error_message']=Common::text_nocoupon;
		}

		return $data;
	}

	public static  function couponDelete($userid){

		$coupondetails=CouponRepostitory::deleteCoupon($userid);
		if($coupondetails){
			$data['error']=Common::error_false;
			$data['error_message']=Common::error_sucess;			
		}else{
			$data['error']=Common::error_true;
			$data['error_message']=Common::text_nocoupon;
		}
		
		return $data;
	} 



	
}
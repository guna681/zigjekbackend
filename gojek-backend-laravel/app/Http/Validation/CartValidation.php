<?php


namespace App\Http\Validation;

use App\Http\Utility\Common;
use App\Http\Repository\UserRepository;


Class CartValidation{

	public static function  validateAddCart($data){

		$validate=array();
		if(empty($data['dishId'])  || empty($data['udId']) || empty($data['restaurantId'])){
			$validate['error']=Common::error_true;
			$validate['error_message']=Common::error_manadatory;
		}elseif(!RestaurantRepostitory::getrestrauntsid($data['restaurantId'])){
			$validate['error']=Common::error_true;
			$validate['error_message']=Common::error_norestaurant;

		}else{

		}

	}

	
}

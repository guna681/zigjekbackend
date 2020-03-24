<?php

namespace App\Http\Service;

use Illuminate\Http\Request;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Repository\SearchRepostitory;
use App\Http\Repository\RestaurantRepostitory;
use App\Http\Repository\CurrencyRepostitory;
use App\Http\Repository\OutletsRepostitory;
use App\Http\Service\AppconfigService;
use App\Restaurant;
use App\Outlets;
use App\Reviews;
use App\OutletsOffers;
use APP\OutletsOfferBanners;
use App\Setting;
use App\Cuisines;
use App\Dishes;

Class SearchService{

	public function searchRestaurants($arg){

		$searchRepostitory=new SearchRepostitory();
		$restaurantDetails=$searchRepostitory->getRestaurant($arg);
		$data=new DataService();
		$restaurantRepostitory=new RestaurantRepostitory();
		if(!$restaurantDetails->isEmpty()){
			$data->error=Common::error_false;
			$data->errorMessage=trans('validation.isRestaurant');			
			$restraunt =array();			
			$data->listRestaurants=array();	
			$currencyRepostitory=new CurrencyRepostitory();
			foreach($restaurantDetails as $key => $restaurants){

				$restaurant=new Restaurant();	
				$restaurant->restaurantId=$restaurants[0]->restaurantId;
				$restaurant->restaurantName=$restaurants[0]->name;
				$restaurant->restaurantImage=url('/').'/images/'.$restaurants['0']->image;
				$restaurant->isPureVeg=$restaurants[0]->isPureVeg;				
				$restaurant->displayCostForTwo=$currencyRepostitory->getCurrency().$restaurants[0]->costForTwo.trans('validation.forTwo');
				$restaurant->isExculsive=$restaurants[0]->isExculsive;			
				$oulet=array();				
				foreach($restaurants as $outlets){					
					$outletRepostitory=new OutletsRepostitory();						
					$query=$outletRepostitory->getOutlets($outlets->id,$arg);
					  if ($restaurants[0]->couponStatus == '1') {
                    $shortDescription = $restaurants[0]->discountPerscentage."%off". " |"."Use coupon"." ".$restaurants[0]->couponCode; 
                    $longDescription = $restaurants[0]->discountPerscentage."%off up to ₹100". " |"."Use coupon"." ".$restaurants[0]->couponCode; 
                    $query->couponName           = $restaurants[0]->couponCode;
                    $query->couponEnabledForRestaurant = $restaurants[0]->couponStatus;
                    $query->shortDescription           = $shortDescription;
                    $query->longDescription           = $longDescription;
                }  else {
                   $query->couponEnabledForRestaurant = "0"; 
                }									
					array_push($oulet,$query);						
					
				}
				    $shortDescription = $restaurants[0]->discountPerscentage."%off". " |"."Use coupon"." ".$restaurants[0]->couponCode; 
                    $longDescription = $restaurants[0]->discountPerscentage."%off up to ₹100". " |"."Use coupon"." ".$restaurants[0]->couponCode;
                    if ($restaurants[0]->couponStatus == '1') {
                    $restaurant->couponName           = $restaurants[0]->couponCode;
                    $restaurant->shortDescription           = $shortDescription;
                    $restaurant->longDescription           = $longDescription;
                    $restaurant->couponEnabledForRestaurant = $restaurants[0]->couponStatus;
                } else {
                   $restaurant->couponEnabledForRestaurant = "0"; 
                }
				$restaurant->cuisines=$query->cuisines;					
				$restaurant->averageReview=(string)number_format($query->averageReview,1);
				$restaurant->time=$query->time;
				$restaurant->displayTime=$query->displayTime;
				$restaurant->outlet=$oulet;	
				
				array_push($data->listRestaurants,$restaurant);				
			}
								
		}else{
			$data->error=Common::error_true;
		    $data->errorMessage=trans('validation.noRestaurant');
		}
		
		return $data;

	}



	public function searchDishesAndRestaurants($arg){

		$searchRepostitory=new SearchRepostitory();
		$restaurantDetails=$searchRepostitory->getRestaurant($arg);
		$getNearOutlets=$searchRepostitory->getNearByOutlets($arg);
		$data=new DataService();
		$restaurantRepostitory=new RestaurantRepostitory();
		if(!$restaurantDetails->isEmpty() OR !$getNearOutlets->isEmpty() ){


			$data->error=Common::error_false;
			$data->errorMessage=trans('validation.isRestaurant');			
			$restraunt =array();			
			$data->listRestaurants=array();
			$data->listDishes=array();		
			$currencyRepostitory=new CurrencyRepostitory();



		if (!$restaurantDetails->isEmpty()) {
			foreach($restaurantDetails as $key => $restaurants){

				$restaurant=new Restaurant();	
				$restaurant->restaurantId=$restaurants[0]->restaurantId;
				$restaurant->restaurantName=$restaurants[0]->name;
				$restaurant->restaurantImage=url('/').'/images/'.$restaurants['0']->image;
				$restaurant->isPureVeg=$restaurants[0]->isPureVeg;				
				$restaurant->displayCostForTwo=$currencyRepostitory->getCurrency().$restaurants[0]->costForTwo.trans('validation.forTwo');
				$restaurant->isExculsive=$restaurants[0]->isExculsive;			
				$oulet=array();				
				foreach($restaurants as $outlets){					
					$outletRepostitory=new OutletsRepostitory();						
					$query=$outletRepostitory->getOutlets($outlets->id,$arg);
					  if ($restaurants[0]->couponStatus == '1') {
                    $shortDescription = $restaurants[0]->discountPerscentage."%off". " |"."Use coupon"." ".$restaurants[0]->couponCode; 
                    $longDescription = $restaurants[0]->discountPerscentage."%off up to ₹100". " |"."Use coupon"." ".$restaurants[0]->couponCode; 
                    $query->couponName           = $restaurants[0]->couponCode;
                    $query->couponEnabledForRestaurant = $restaurants[0]->couponStatus;
                    $query->shortDescription           = $shortDescription;
                    $query->longDescription           = $longDescription;
                }  else {
                   $query->couponEnabledForRestaurant = "0"; 
                }									
					array_push($oulet,$query);						
					
				}
				    $shortDescription = $restaurants[0]->discountPerscentage."%off". " |"."Use coupon"." ".$restaurants[0]->couponCode; 
                    $longDescription = $restaurants[0]->discountPerscentage."%off up to ₹100". " |"."Use coupon"." ".$restaurants[0]->couponCode;
                    if ($restaurants[0]->couponStatus == '1') {
                    $restaurant->couponName           = $restaurants[0]->couponCode;
                    $restaurant->shortDescription           = $shortDescription;
                    $restaurant->longDescription           = $longDescription;
                    $restaurant->couponEnabledForRestaurant = $restaurants[0]->couponStatus;
                } else {
                   $restaurant->couponEnabledForRestaurant = "0"; 
                }
				$restaurant->cuisines=$query->cuisines;					
				$restaurant->averageReview=(string)number_format($query->averageReview,1);
				$restaurant->time=$query->time;
				$restaurant->displayTime=$query->displayTime;
				$restaurant->outlet=$oulet;	
				
				array_push($data->listRestaurants,$restaurant);	
			}
			    } 
			  

		if (!$getNearOutlets->isEmpty()) {
            $oulet=array();
			foreach($getNearOutlets as $key => $outlet){
				$dishes = new Dishes();
		    $outletRepostitory=new OutletsRepostitory();						
					$query=$outletRepostitory->getOutlets($outlet[0]->id,$arg);

		    	$restaurant=new Restaurant();	
				$dishes->restaurantId=$outlet[0]->restaurantId;
				$dishes->restaurantName=$outlet[0]->name;
				$dishes->restaurantImage=url('/').'/images/'.$outlet['0']->image;
				$dishes->isPureVeg=$outlet[0]->isPureVeg;				
				$dishes->displayCostForTwo=$currencyRepostitory->getCurrency().$outlet[0]->costForTwo.trans('validation.forTwo');
				$dishes->isExculsive=$outlet[0]->isExculsive;
							
			$dishes->outletName = $outlet[0]->name;
			  if ($outlet[0]->couponStatus == '1') {
	            $shortDescription = $outlet[0]->discountPerscentage."%off". " |"."Use coupon"." ".$outlet[0]->couponCode; 
	            $longDescription = $outlet[0]->discountPerscentage."%off up to ₹100". " |"."Use coupon"." ".$outlet[0]->couponCode; 
	            $dishes->couponName           = $outlet[0]->couponCode;
	            $dishes->couponEnabledForRestaurant = $outlet[0]->couponStatus;
	            $dishes->shortDescription           = $shortDescription;
	            $dishes->longDescription           = $longDescription;
	            $dishes->cuisines=$query->cuisines;					
				$dishes->averageReview=(string)number_format($query->averageReview,1);
				$dishes->time=$query->time;
				$dishes->displayTime=$query->displayTime;
	        }  else {
	           $dishes->couponEnabledForRestaurant = "0"; 
	        }
			$dishesDetails=$searchRepostitory->getDishes($outlet[0]->id,$arg);
			$dishes->dishesList = $dishesDetails;
			array_push($oulet,$dishes);
             
			}
			
			$data->listDishes = $oulet;
		}
								
		}else{
							
			$data->error           =Common::error_true;
		    $data->errorMessage    =trans('validation.noRestaurant');
		    $data->listRestaurants = [];
		    $data->listDishes      = [];
		}
		
		return $data;

	}


}
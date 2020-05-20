<?php

namespace App\Http\Service;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Guzzle\Http\Exception\ServerErrorResponseException;
use App\Http\Utility\Common;
use App\Http\Utility\Constant;
use App\Http\Utility\Defaults;
use App\Http\DTO\CartDTO;
use App\Http\Repository\DishRepostitory;
use App\Http\Controllers\AppconfigController;
use App\DishesCustomisation;
use App\Http\Repository\OutletsRepostitory;
use App\Http\Repository\CurrencyRepostitory;
use App\Http\Repository\CartRepostitory;
use App\Outlets;
use App\Dishes;
use App\OutletMenuCategories;
use App\DishesCustomisationCategories;
use App\Cart;
use Validator;
use Illuminate\Contracts\Translation\Translator;
use Illuminate\Support\MessageBag;





Class DishService
{


    public function listDishes($arg)
    {


        $dishRepostitory    = new DishRepostitory();
        $category           = $dishRepostitory->getCategory($arg->outletId);
        $subCategorys       = $dishRepostitory->getSubCategory($arg->outletId);
        $data               = new DataService();

        if ($category) {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.isDishes');
            $data->dishes       = array();
            $recommanded        = self::getRecommended($arg->outletId);
            array_push($data->dishes, $recommanded);
            foreach ($category as $mainCategory) {
                $isSubCategory          = self::subCategory($mainCategory['categoryId'], $subCategorys);
                $outletMenuCategories   = new OutletMenuCategories();
                if ($isSubCategory) {
                    $outletMenuCategories->categoryId          = $mainCategory['categoryId'];
                    $outletMenuCategories->categoryName        = $mainCategory['categoryName'];
                    $outletMenuCategories->isRecommended       = Constant::NO_RECOMMENDED;
                    $outletMenuCategories->isHavingSubCategory = Constant::IS_SUBCATEGORY;
                    $subCategoryValues = array();
                    foreach ($isSubCategory as $subCategoryId) {
                        $subCategory                 = (object)array();
                        $subCategory->categoryValues = array();
                        $subCategory->categoryName   = $subCategoryId['categoryName'];
                        $dishes                      = self::dishes($subCategoryId);//get the dishes
                                                        //below code using parentCategoryId place the dishes array
                        $subCategory->categoryValues = data_fill($dishes,'*.categoryId',$subCategoryId['parentId']);
                        array_push($subCategoryValues, $subCategory);

                    }
                    $outletMenuCategories->subCategoryValues = $subCategoryValues;
                    array_push($data->dishes, $outletMenuCategories);
                } else {
                    $outletMenuCategories->categoryId           = $mainCategory['categoryId'];
                    $outletMenuCategories->categoryName         = $mainCategory['categoryName'];
                    $outletMenuCategories->isRecommended        = Constant::NO_RECOMMENDED;
                    $outletMenuCategories->isHavingSubCategory  = Constant::NO_SUBCATEGORY;
                    $dishes = self::dishes($mainCategory);
                    $outletMenuCategories->categoryValues       = $dishes;

                    array_push($data->dishes, $outletMenuCategories);

                }

            }

        } else {

            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.noDishes');
            $data->listDishes   = array();

        }


        return $data;


    }


   public function subCategory($categoryId,$subcategory){
     
	$result = array_filter($subcategory, function ($item) use ($categoryId) {
		if ($item['parentId'] === $categoryId) {
			return $item['categoryId'];
		}

		return false;
		
	});

 	return $result;

   }





public function dishes($subCategory){

	$dishRepostitory=new DishRepostitory();
	$category=$subCategory;
	$dishes  =$dishRepostitory->getDish($category['categoryId']);	
	$currencyRepostitory=new CurrencyRepostitory();
	$currency=$currencyRepostitory->getCurrency();



	$items=$dishes->map(function($item)use($currency){
			$dishes=new dishes();
			$dishes->dishId			= $item->dishId;
			$dishes->dishName 		= $item->dishName;
            $dishes->price    		= (double) $item->price;
			$price = number_format($dishes->price,2);
			if ($item->slashedPrice != 0) {
			$dishes->displayPrice	=$currency.$item->slashedPrice;
			$dishes->slashedPrice           = $item->price;
			} else {
			$dishes->slashedPrice	=0;
			$dishes->displayPrice	=$currency.$price;
			}
			$dishes->isVeg			=$item->isVeg;
			$availableFrom          =strtotime($item->showFromTime);
			$availableTo            =strtotime($item->showToTime);		
			$dishes->availableFrom  =floor($availableFrom/ 60);
			$dishes->availableTo    =floor($availableTo/ 60);
			$dishes->availableFromTime  =$item->showFromTime;
			$dishes->availableToTime    =$item->showToTime;
			$dishes->isAvailable    =Common::error_true;
			$dishes->description    =$item->description;
			$dishes->dishCustomisation=self::getCustomisation($item->dishId);
			if(!$dishes->dishCustomisation->isEmpty()){
				$dishes->isCustomizable=Constant::IS_CUSTOMIZE;
			}else{
				$dishes->isCustomizable=Constant::NO_CUSTOMIZE;
			}
			return $dishes;
		 });


	return $items;

   }

 public function getRecommended($outletId){
		$dishRepostitory=new DishRepostitory();
		$dishes=$dishRepostitory->getRecommendedDihses($outletId);
		$currencyRepostitory=new CurrencyRepostitory();
		$currency=$currencyRepostitory->getCurrency();
		$items=$dishes->map(function($item)use($currency){						
		
			$dishes=new dishes();
			$dishes->categoryId     = $item->isRecommended;
			$dishes->dishId			=$item->dishId;
			$dishes->dishName 		=$item->dishName;
			// $dishes->price    		=(double)$item->price;
            $price= number_format($item->price,2);
			if ($item->slashedPrice != 0) {
			$dishes->price    		=(double)$item->slashedPrice;	
			$dishes->displayPrice	=$currency.$item->slashedPrice;
			$dishes->slashedPrice           = $item->price;
			} else {
			$dishes->price    		=(double)$item->price;
			$dishes->slashedPrice           = 0;
			$dishes->displayPrice	=$currency.$price;
			}
			$dishes->dishImage		=url('/').'/images/'.$item->image;
			$dishes->isVeg			=$item->isVeg;
			$availableFrom          =strtotime($item->showFromTime);
			$availableTo            =strtotime($item->showToTime);		
			$dishes->availableFrom  =floor($availableFrom/ 60);
			$dishes->availableTo    =floor($availableTo/ 60);
			$dishes->availableFromTime  =$item->showFromTime;
			$dishes->availableToTime    =$item->showToTime;
            $dishes->isAvailable    =Common::error_true;
			$dishes->dishCustomisation=self::getCustomisation($item->dishId);
			if(!$dishes->dishCustomisation->isEmpty()){
				$dishes->isCustomizable=Constant::IS_CUSTOMIZE;
			}else{
				$dishes->isCustomizable=Constant::NO_CUSTOMIZE;
			}

			return $dishes;
		 });
		 $outletMenuCategories= new OutletMenuCategories();				
		 $outletMenuCategories->categoryId  =1;
		 $outletMenuCategories->categoryName=Constant::RECOMMENDED;
		 $outletMenuCategories->isRecommended=Constant::IS_RECOMMENDED;
		 $outletMenuCategories->isHavingSubCategory=Constant::NO_SUBCATEGORY;  
		 $outletMenuCategories->categoryValues=$items->flatten();
		 
	
		return $outletMenuCategories;	   
 
   }



   public function getCustomisation($dishId){
	$dishRepostitory=new DishRepostitory();
	$customization=$dishRepostitory->getCustomisationCategory($dishId);
	$customizationItem=$dishRepostitory->getCustomisationItem($dishId);
	    $data=$customization->map(function($customization) use($customizationItem){
		$item=$customizationItem->filter(function($categoryId) use($customization){
		   return $categoryId->customisationCategoryId == $customization->customisationCategoryId;
		   
		 });
		 $dishesCustomisationCategories  =new DishesCustomisationCategories();
		 $dishesCustomisationCategories->customizableId       =$customization->customisationCategoryId;
		 $dishesCustomisationCategories->customizableName     =$customization->customisationName;
		 $dishesCustomisationCategories->customizableType     =$customization->categoriesType;
		 $dishesCustomisationCategories->customizableDishItems=$item->flatten();	
		 return $dishesCustomisationCategories;
	 });

	
    return $data;

   }

   public function getCartDetails($udId){
	   $dishRepostitory=new DishRepostitory();
	   $getCartItem=$dishRepostitory->getCart($udId);
	   $data=$getCartItem->map(function($getCartItem){				 
			 $cart= new cart();
			 $cart->cartId=$getCartItem->cartId;
			 $cart->dishId=$getCartItem->dishId;
			 $cart->customisation=self::getCartCustoimsation($getCartItem->cartId);           		    

             return $cart;

	   });
	return $data;
   }

   public function getCartCustoimsation($cartId){
	   $dishRepostitory=new DishRepostitory();
	   $data=$dishRepostitory->getCartCustomisation($cartId);
	   return $data;
   }

 



}
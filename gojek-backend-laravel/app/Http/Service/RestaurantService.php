<?php

namespace App\Http\Service;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Guzzle\Http\Exception\ServerErrorResponseException;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Repository\RestaurantRepostitory;
use App\Http\Repository\CurrencyRepostitory;
use App\Http\Repository\OutletsRepostitory;
use App\Http\Repository\UserRepository;
use App\Http\Service\AppconfigService;
use App\Http\Repository\OrderRepostitory;
use App\Http\Repository\SettingRepostitory;
use App\Http\Utility\Constant;
use App\Restaurant;
use App\Outlets;
use App\Reviews;
use App\OutletsOffers;
use APP\OutletsOfferBanners;
use App\Setting;
use App\Cuisines;

Class RestaurantService
{

    public function getRestaurant($userId)
    {
        $restaurantRepostitory  = new RestaurantRepostitory();
        $orderRepostitory  = new OrderRepostitory();
        $restaurantDetails      = $restaurantRepostitory->getNearOutletsRestaurants($userId);
        $ratings                = $orderRepostitory->findRatingStatus($userId);
       
        $data                   = new DataService();
        $data->address          = array($restaurantRepostitory->getAddress($userId));
        if (!$restaurantDetails->isEmpty()) {
            $data->error            = Common::error_false;
            $data->errorMessage     = trans('validation.isRestaurant');
            $restraunt              = array();
            $offerBanners           = array();
            $listRestaurants  = array();
            $currencyRepostitory    = new CurrencyRepostitory();

            foreach ($restaurantDetails as $index => $restaurants) {
                $restaurant                     = new Restaurant();
                $restaurant->restaurantId       = $restaurants[0]->restaurantId;
                $restaurant->restaurantName     = $restaurants[0]->restName;
                $restaurant->restaurantImage    = url('/') . '/images/' . $restaurants['0']->image;
                $restaurant->isPureVeg          = $restaurants[0]->isPureVeg;
                $restaurant->costForTwo         = $restaurants[0]->costForTwo;
                $restaurant->displayCostForTwo  = $currencyRepostitory->getCurrency() . $restaurants[0]->costForTwo . " " . __('validation.forTwo');
                $restaurant->isExculsive        = $restaurants[0]->isExculsive;
                $restaurant->unit               = $currencyRepostitory->getCurrency();
                $oulet                          = array();
                foreach ($restaurants as $outlets) {
                    $outletRepostitory      = new OutletsRepostitory();
                    $query                  = $outletRepostitory->getOutlets($outlets->id, $data->address[0]); 
                    $shortDescription = $restaurants[0]->discountPerscentage."%off". " |"."Use coupon"." ".$restaurants[0]->couponName; 
                    $longDescription = $restaurants[0]->discountPerscentage."%off up to ₹100". " |"."Use coupon"." ".$restaurants[0]->couponName;
                    if ($restaurants[0]->couponStatus == '1') {
                    $query->couponName           = $restaurants[0]->couponName;
                    $query->shortDescription           = $shortDescription;
                    $query->longDescription           = $longDescription;
                    $query->couponEnabledForRestaurant = $restaurants[0]->couponStatus;
                } else {
                   $query->couponEnabledForRestaurant = "0"; 
                }
                        if ($query->status === 1) {
                            array_push($oulet, $query);
                        }                   
                    $banner                 = $outletRepostitory->getoutletOffersBanners($outlets->id);
                    if ($banner) {
                        $outletsOfferBanners                 = new OutletsOfferBanners();
                        $outletsOfferBanners->bannerId       = $banner->id;
                        $outletsOfferBanners->bannerImage    = url('/') . '/images/' . $banner->bannerImages;
                        $outletsOfferBanners->outletId       = $banner->outletId;
                        $outletsOfferBanners->outlets        = array($query);
                        array_push($offerBanners, $outletsOfferBanners);
                    }
                }
                if ($restaurants[0]->couponStatus == '1') {
                    $shortDescription = $restaurants[0]->discountPerscentage."%off". " |"."Use coupon"." ".$restaurants[0]->couponName; 
                    $longDescription = $restaurants[0]->discountPerscentage."%off up to ₹100". " |"."Use coupon"." ".$restaurants[0]->couponName; 
                    $restaurant->couponName           = $restaurants[0]->couponName;
                    $restaurant->couponEnabledForRestaurant = $restaurants[0]->couponStatus;
                    $restaurant->shortDescription           = $shortDescription;
                    $restaurant->longDescription           = $longDescription;
                }  else {
                   $query->couponEnabledForRestaurant = "0"; 
                }

                $restaurant->cuisines           = $query->cuisines;
                $restaurant->cuisines           = $query->cuisines;
                $restaurant->averageReview      = (string)number_format($query->averageReview, 1);
                $restaurant->time               = $query->time;
                $restaurant->displayTime        = $query->displayTime;
                $restaurant->outlet             = $oulet;
               

                if ( count($oulet) !== 0 ) {

                    array_push($listRestaurants, $restaurant);

                }
            }

            if ($ratings) {
                $deliveryTime = strtotime($ratings->deliveredTime);
                $currentdate = date("Y-m-d h:i:sa");
                $currentTime = strtotime($currentdate);
                $checkTime = round(abs($deliveryTime - $currentTime) / 60,2);

                $setting=new SettingRepostitory();
                $ratingPopupTime=$setting->getValue(Constant::SHOW_RATING_POPUP_AFTER); 
                if ($checkTime > $ratingPopupTime) {
            $data->ratings            =array($ratings);
            $data->ratingPending      =Common::error_true;
                } else {
            $data->ratingPending      =Common::error_false;
            $data->ratings            =[];
                }

            } else {
            $data->ratingPending      =Common::error_false;
            $data->ratings            =[];
            }

            $data->cartCount        = $restaurantRepostitory->getCartCount($userId);
            $data->restaurantCount  = count($listRestaurants);
            $data->banners          = $offerBanners;
            $data->listRestaurants  = $listRestaurants;

        } else {
            $data->error           = Common::error_true;
            $data->errorMessage    = trans('validation.noRestaurant');
        }

        return $data;

    }


//distancebasedTime


    public function getGuestListRestaurant($req)
    {
        $restaurantRepostitory  = new RestaurantRepostitory();
        $restaurantDetails      = $restaurantRepostitory->getGuestNearOutletsRestaurants($req);
        $data                   = new DataService();
        // $data->address          = array($restaurantRepostitory->getAddress($userId));
        if (!$restaurantDetails->isEmpty()) {
            $data->error            = Common::error_false;
            $data->errorMessage     = trans('validation.isRestaurant');
            $restraunt              = array();
            $offerBanners           = array();
            $data->listRestaurants  = array();
            $currencyRepostitory    = new CurrencyRepostitory();

            foreach ($restaurantDetails as $key => $restaurants) {

                $restaurant                     = new Restaurant();
                $restaurant->restaurantId       = $restaurants[0]->restaurantId;
                $restaurant->restaurantName     = $restaurants[0]->name;
                $restaurant->restaurantImage    = url('/') . '/images/' . $restaurants['0']->image;
                $restaurant->isPureVeg          = $restaurants[0]->isPureVeg;
                $restaurant->costForTwo         = $restaurants[0]->costForTwo;
                $restaurant->displayCostForTwo  = $currencyRepostitory->getCurrency() . $restaurants[0]->costForTwo . " " . __('validation.forTwo');
                $restaurant->isExculsive        = $restaurants[0]->isExculsive;
                $restaurant->unit               = $currencyRepostitory->getCurrency();
                $oulet                          = array();
                foreach ($restaurants as $outlets) {
                    $outletRepostitory      = new OutletsRepostitory();
                    $query                  = $outletRepostitory->getOutlets($outlets->id, $outlets);
                    array_push($oulet, $query);
                    $banner                 = $outletRepostitory->getoutletOffersBanners($outlets->id);
                    if ($banner) {
                        $outletsOfferBanners                 = new OutletsOfferBanners();
                        $outletsOfferBanners->bannerId       = $banner->id;
                        $outletsOfferBanners->bannerImage    = url('/') . '/images/' . $banner->bannerImages;
                        $outletsOfferBanners->outletId       = $banner->outletId;
                        $outletsOfferBanners->outlets        = array($query);
                        array_push($offerBanners, $outletsOfferBanners);
                    }

                }
                $restaurant->cuisines           = $query->cuisines;
                $restaurant->averageReview      = (string)number_format($query->averageReview, 1);
                $restaurant->time               = $query->time;
                $restaurant->displayTime        = $query->displayTime;
                $restaurant->outlet             = $oulet;
                array_push($data->listRestaurants, $restaurant);
            }
            // $data->cartCount        = $restaurantRepostitory->getCartCount($userId);
            $data->restaurantCount  = count($data->listRestaurants);
            $data->banners          = $offerBanners;


        } else {
            $data->error           = Common::error_true;
            $data->errorMessage    = trans('validation.noRestaurant');
        }

        return $data;

    }



}
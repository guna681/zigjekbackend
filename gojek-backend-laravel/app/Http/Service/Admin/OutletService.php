<?php

namespace App\Http\Service\Admin;

use App\Http\Utility\Common;
use App\Http\Repository\OutletsRepostitory;
use App\Outlets;
use App\Http\Repository\CurrencyRepostitory;

Class OutletService
{

    public function listOutlets($pageNumber){

        $outletsRepostitory = new OutletsRepostitory();
        $outlets            = $outletsRepostitory->listOutlets($pageNumber);
        $data               = new DataService();
        if ($outlets) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->outlets      = $outlets->flatten();
            $data->totalPage    = $outlets->lastPage();
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }

    public function getOutlets($outletId){
        $currency         = new CurrencyRepostitory();
        $outletsRepostitory = new OutletsRepostitory();
        $results            = $outletsRepostitory->getOutlet($outletId);
        $data               = new DataService();
        if ($results) {
            $data->error            = Common::error_false;
            $data->errorMessage     = __('validation.sucess');
            $data->outlets          = $this->outletTransformers($results);
            $data->currency   = $currency->getCurrency();
            $data->orders           = $outletsRepostitory->lastOutletOrders($outletId);
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }


    public function updateOutlets($arg){

        $outletsRepostitory = new OutletsRepostitory();
        $outlets            = $outletsRepostitory->updateOutlets($arg);
        $data               = new DataService();
        if ($outlets) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.updateSuccess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;
    }


    public function getRestaurantLoginToken($arg)
    {

        $outletsRepostitory = new OutletsRepostitory();
        $outlet             = $outletsRepostitory->getOutletDetails($arg->outletId);
        $data               = new DataService();
        if ($outlet) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->accessToken  = $outlet->createToken('Token Name')->accessToken;
            $data->outlets      = $this->outletTransformers($outlet);

        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;


    }


    public function outletTransformers($results){
        $outlets                    = new Outlets();
        $outlets->outletId          = $results->id;
        $outlets->outletName        = $results->name;
        $outlets->image             = url('/').'/images/'.$results->image;
        $outlets->restaurantId      = $results->restaurantId;
        $outlets->email             = $results->email;
        $outlets->isPureVeg         = $results->isPureVeg;
        $outlets->costForTwo        = $results->costForTwo;
        $outlets->addressLineOne    = $results->addressLineOne;
        $outlets->addressLineTwo    = $results->addressLineTwo;
        $outlets->street            = $results->street;
        $outlets->area              = $results->area;
        $outlets->city              = $results->city;
        $outlets->state             = $results->state;
        $outlets->country           = $results->country;
        $outlets->zipcode           = $results->zipcode;
        $outlets->latitude          = $results->latitude;
        $outlets->longitude         = $results->longitude;
        $outlets->contactNumber     = $results->contactNumber;
        $outlets->status            = $results->status;
        $outlets->preparationTime   = $results->preparationTime;
        $outlets->commission         = $results->restaurantCommission;
        $outlets->totalAmount            = $results->totalAmount;
        $outlets->balanceAmount            = $results->balanceAmount;

        return $outlets;
    }

}
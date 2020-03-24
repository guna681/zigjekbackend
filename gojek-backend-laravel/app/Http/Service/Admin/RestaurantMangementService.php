<?php
namespace App\Http\Service\Admin;

use App\Http\Utility\Common;
use App\Http\Repository\RestaurantRepostitory;
use App\Http\Service\MailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

Class  RestaurantMangementService{


    public function listRestaurant()
    {
        $restaurantRepostitory      = new RestaurantRepostitory();
        $restaurants                = $restaurantRepostitory->listRestaurant();
        $data                       = new DataService();
        if ($restaurants) {
            $data->error         = Common::error_false;
            $data->errorMessage  = __('validation.sucess');
            $data->restaurants   = $restaurants;
        } else {
            $data->error         = Common::error_false;
            $data->errorMessage  = __('validation.failure');
            $data->restaurants   = $restaurants;
        }
        return $data;
    }

    public function getRestaurantList($page)
    {
        $restaurantRepostitory      = new RestaurantRepostitory();
        $restaurants                = $restaurantRepostitory->getRestaurantList($page);
        $data                       = new DataService();
        if (!$restaurants->isEmpty()) {
            $data->error            = Common::error_false;
            $data->errorMessage     = __('validation.sucess');
            $data->restaurantList   = $restaurants->flatten();
            $data->totalPage        = $restaurants->lastPage();
        } else {
            $data->error            = Common::error_true;
            $data->errorMessage     = __('validation.noRestaurant');

        }
        return $data;
    }


    public function getRestaurant($restaurantId)
    {
        $restaurantRepostitory       = new RestaurantRepostitory();
        $restaurants                 = $restaurantRepostitory->getRestaurantDetails($restaurantId);
        $data                        = new DataService();
        if ($restaurants) {
            $data->error             = Common::error_false;
            $data->errorMessage      = __('validation.sucess');
            $data->restaurantDetails = $restaurants;

        } else {
            $data->error             = Common::error_true;
            $data->errorMessage      = __('validation.failure');

        }
        return $data;
    }

    public function addOutlets($arg)
    {
        $restaurantRepostitory      = new RestaurantRepostitory();

        $restaurants                = $restaurantRepostitory->addOutlets($arg);
        $data                       = new DataService();
        if ($restaurants) {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.sucess');
            $mailService        = new MailService();
            $mailService->adminMail($arg);
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;
    }

    public function listOutlets()
    {
        $restaurantRepostitory     = new RestaurantRepostitory();
        $outlets                   = $restaurantRepostitory->listOutlets();
        $data                      = new DataService();
        if ($outlets) {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.sucess');
            $data->outlets      = $outlets;
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = trans('validation.failure');
            $data->outlets      = $outlets;
        }
        return $data;
    }


    /* banners outlets*/

    public function getBanner($arg)
    {
        $restaurantRepostitory = new RestaurantRepostitory();
        $banners               = $restaurantRepostitory->getBanner($arg);
        $data                  = new DataService();
        if ($banners) {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.sucess');
            $data->banners      = $banners;
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = trans('validation.failure');
            $data->banners      = $banners;
        }
        return $data;
    }


    public function updateBanners($arg)
    {
        $restaurantRepostitory  = new RestaurantRepostitory();
        $banners                = $restaurantRepostitory->updateBanners($arg);
        $data                   = new DataService();
        if ($banners) {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.sucess');

        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = trans('validation.failure');
        }

        return $data;
    }
    
}
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Service\Admin\RestaurantMangementService;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Validator;


Class RestaurantMangementController extends Controller
{


    /**
     * List the Restaurants api
     * @param pageNumber
     * @return json
     * */
    public function getRestaurantList(request $request)
    {
        $restaurantMangementService = new RestaurantMangementService();
        $response                   = $restaurantMangementService->getRestaurantList($request->page);
        $responseData               = Defaults::encode($response);
        return $responseData;
    }


    public function listRestaurant(request $request)
    {

        $restaurantMangementService   = new RestaurantMangementService();
        $response                     = $restaurantMangementService->listRestaurant();
        $responseData                 = Defaults::encode($response);
        return $responseData;
    }

    /**
     * Get the Restaurant details api
     * @param restaurant Id
     * @retrun json (restaurant Details)
     * */
    public function getRestaurant(request $request)
    {
        $response    = new Response();
        $rules       = ['id' => 'required|exists:Restaurant'];
        $validator   = Validator::make(['id' => $request->restaurantId], $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $restaurantMangementService = new RestaurantMangementService();
            $response                   = $restaurantMangementService->getRestaurant($request->restaurantId);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


    public function listOutlets(request $request)
    {
        $restaurantMangementService = new RestaurantMangementService();
        $response                   = $restaurantMangementService->listOutlets();
        $responseData               = Defaults::encode($response);
        return $responseData;
    }


    /**
     * @params for outletDetails
     * @exception throws
     * @return json
     * */

    public function addOutlets(request $request)
    {
        $response  = new Response();
        $rules     = ['outletName' => 'required',
                      'email'      => 'required|email|unique:Outlets',
                      'password'   => 'required',
                      'costForTwo' => 'required',
                      'preparationTime' => 'required',
                      'addressLineOne' => 'required',
                      // 'addressLineTwo' => 'required',
                      'area'           => 'required',
                      'city'           => 'required',
                      'isRestaurant'   => 'required',
                      'isPureVeg'      => 'required',
                      'latitude'       => 'required',
                      'longitude'      => 'required',
                      'contactNumber'  => 'required',
                      // 'commission'      => 'required',
                     ];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $restaurantMangementService = new RestaurantMangementService();
            $response                    = $restaurantMangementService->addOutlets($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }


    //banners offers
    public function getBanner(request $request)
    {

        $restaurantMangementService  = new RestaurantMangementService();
        $response                    = $restaurantMangementService->getBanner($request->id);
        $responseData                = Defaults::encode($response);
        return $responseData;
    }


    public function updateBanners(request $request)
    {
        $response   = new Response();
        $rules      = ['bannerId' => 'required',
                       'outletId' => 'required',
                       'status'   => 'required',
                       ];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $restaurantMangementService = new RestaurantMangementService();
            $response                   = $restaurantMangementService->updateBanners($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


    public function accessRestaurantAdmin(request $request)
    {
        $restaurantId   = $request->restaurantId;
        $data           = Auth::loginUsingId($restaurantId);

    }


}

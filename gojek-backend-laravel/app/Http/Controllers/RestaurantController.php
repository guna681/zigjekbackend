<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Guzzle\Http\Exception\ServerErrorResponseException;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use Illuminate\Support\Facades\Response;
use App\Http\Service\RestaurantService;
use App\Http\Service\DishService;
use Validator;

Class  RestaurantController extends Controller
{


    public function listRestaurants(request $request)
    {
        $userId     = Auth::guard('api')->user()->id;
        $response   = new Response();
        if ($userId) {
            $restaurantService      = new RestaurantService();
            $response               = $restaurantService->getRestaurant($userId);

        } else {
            $response->error        = Common::error_true;
            $response->errorMessage = trans('Validation.isDishes');

        }

        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    public function guestListRestaurants(request $request)
    {
        // $userId     = Auth::guard('api')->user()->id;

        $response   =new Response();
        $rules      = ['latitude'   =>'required',
                       'longitude'  =>'required'];
                       // 'token'  =>'required|string'];


        $validator  = Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   =$validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage =$data->first();
        }else{
            $restaurantService      = new RestaurantService();
            $response               = $restaurantService->getGuestListRestaurant($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    public function listDishes(request $request)
    {
        $response   = new Response();
        $rules      = ['outletId' => 'required|numeric'];

        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $dishService            = new DishService();
            $response               = $dishService->listDishes($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

}

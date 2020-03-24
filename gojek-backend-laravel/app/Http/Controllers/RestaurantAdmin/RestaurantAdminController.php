<?php

namespace App\Http\Controllers\RestaurantAdmin;

use App\Http\Controllers\Controller;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use Illuminate\Http\Request;
use App\Http\Service\RestaurantAdmin\RestaurantAdminService;
use Illuminate\Support\Facades\Response;
use Validator;
use Auth;

Class RestaurantAdminController extends  Controller
{


    /**
     * @param  Restaurant admin email , password
     * @return array
     * @throws  \Exception
     */
    public function loginRestaurantAdmin(request $request){
        $response   =new Response();
        $rules      = ['email'   =>'required|email|exists:Outlets',
                       'password'=>'required|min:6'];
        $validator  = Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   =$validator->messages();
            $response->error        =Common::error_true;
            $response->errorMessage =$data->first();
        }else{
            $restaurantAdminService = new RestaurantAdminService();
            $response               = $restaurantAdminService->loginRestaurantAdmin($request);
        }
        $responsedata=Defaults::encode($response);
        return $responsedata;
    }


    public function  changePassword(request $request){

        $response  = new Response();
        $rules     = ['email'   =>'required|email|exists:Outlets',
                      'password'=>'required:min:6'];
        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   =$validator->messages();
            $response->error        =Common::error_true;
            $response->errorMessage =$data->first();
        }else{
            $restaurantAdminService = new RestaurantAdminService();
            $response               = $restaurantAdminService->changePassword($request);
        }
        $responsedata =Defaults::encode($response);
        return $responsedata;

    }


    /**
     * Get the outlet Profile details api
     * @param oultetId
     * @return json (outletDetails)
     * */

    public function getOutletProfile(request $request)
    {

        $restaurantAdminService  = new RestaurantAdminService();
        $response                = $restaurantAdminService->getOutletProfile();
        $responsedata            = Defaults::encode($response);
        return $responsedata;
    }




}

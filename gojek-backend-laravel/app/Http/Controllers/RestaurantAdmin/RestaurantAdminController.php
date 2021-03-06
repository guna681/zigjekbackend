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

/**
     * @param  Restaurant admin  , devices token
     * @return array
     * @throws  \Exception
     */
    public function updateDeviceToken(request $request){
        $response   =new Response();
        $rules      = ['deviceToken'   =>'required'];
        $validator  = Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   =$validator->messages();
            $response->error        =Common::error_true;
            $response->errorMessage =$data->first();
        }else{
            $restaurantAdminService = new RestaurantAdminService();
            $response               = $restaurantAdminService->updateDeviceToken($request);
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

            public function  forgotPassword(request $request){

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
            $response               = $restaurantAdminService->forgotPassword($request);
        }
        $responsedata =Defaults::encode($response);
        return $responsedata;

    }



        public function  sendEmailOtp(request $request){

        $response  = new Response();
        $rules     = ['email'   =>'required|email|exists:Outlets'];
        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   =$validator->messages();
            $response->error        =Common::error_true;
            $response->errorMessage =$data->first();
        }else{
            $restaurantAdminService = new RestaurantAdminService();
            $response               = $restaurantAdminService->sendEmailOtp($request);
        }
        $responsedata =Defaults::encode($response);
        return $responsedata;

    }


          public function  verifyEmailOtp(request $request){

      $response  = new Response();
      $rules     = ['email'   =>'required|email|exists:Outlets',
                    'otp'=>'required:min:6' ];
      $validator = Validator::make($request->all(),$rules);
      if($validator->fails()){
          $data                   =$validator->messages();
          $response->error        =Common::error_true;
          $response->errorMessage =$data->first();
      }else{
          $restaurantAdminService = new RestaurantAdminService();
          $response               = $restaurantAdminService->verifyEmailOtp($request);
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

    /**
     *  edit outlet Profile details api
     * @param oultetId
     * @return json (outletDetails)
     * */

    public function editProfile(request $request)
    {
        $response  = new Response();
        $rules     = ['email'   =>'required',
                      'name'=>'required:min:6',
                      'mobileNumber'=>'required|max:15|min:7'
                    ];
        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   =$validator->messages();
            $response->error        =Common::error_true;
            $response->errorMessage =$data->first();
        }else{
            $restaurantAdminService = new RestaurantAdminService();
            $response               = $restaurantAdminService->editProfile($request);
        }
        $responsedata =Defaults::encode($response);
        return $responsedata;
    }


    public function logout(request $request)
    {

        $restaurantAdminService  = new RestaurantAdminService();
        $response                = $restaurantAdminService->logout($request);
        $responsedata            = Defaults::encode($response);
        return $responsedata;
    }

}

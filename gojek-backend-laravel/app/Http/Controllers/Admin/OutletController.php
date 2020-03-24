<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Service\Admin\OutletService;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Repository\OutletsRepostitory;
use Illuminate\Support\Facades\Response;
use Validator;

Class OutletController extends Controller
{

    public function listOutlet(request $request)
    {

        $outletService      = new OutletService();
        $response           = $outletService->listOutlets($request->page);
        $responsedata       = Defaults::encode($response);
        return $responsedata;
    }

    public function getOutlet(request $request)
    {
        $response   = new Response();
        $rules      = ['id' => 'required|exists:Outlets,id'];
        $validator  = Validator::make(['id' => $request->outletId], $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $outletService          = new OutletService();
            $response               = $outletService->getOutlets($request->outletId);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }



    /**
     *Update OutletDetails
     * @param restaurantId not edit and not changed
     * @param latitude,longtitude,address line
     * @return boolean
     *
     *  */

    public function updateOutlet(request $request)
    {
        $response  = new Response();
        $rules     = array('restaurantId'=>'required|exists:Restaurant,id',
                           'status'=>'required',
                           'outletId'=>'required|exists:Outlets,id',
                         );
        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        }else{
            $outletService          = new OutletService();
            $response               = $outletService->updateOutlets($request);
        }

        $responsedata = Defaults::encode($response);
        return $responsedata;

    }

    /*
    * Login Admin in  Restaurant panel api
    * @param  outletId
    * @return json (accesstoken)
    */

    public function loginRestaurant(request $request)
    {
        $response   = new Response();
        $rules      = array('outletId' => 'required|exists:Outlets,id');
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   =  $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $outlerService  = new OutletService();
            $response       = $outlerService->getRestaurantLoginToken($request);
        }
        $responsedata       = Defaults::encode($response);

        return $responsedata;
    }


    public function updateOutletstest(request $request)
    {
        $response  = new Response();
        $rules     = array('amount'=>'required',
                           'outletId'=>'required'
                         );
        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        }else{
            // $outletService          = new OutletService();
            $outletsRepostitory     = new OutletsRepostitory();
            $response               = $outletsRepostitory->updateOutletsEarnings($request->amount, $request->outletId);
        }

        $responsedata = Defaults::encode($response);
        return $responsedata;

    }    

}

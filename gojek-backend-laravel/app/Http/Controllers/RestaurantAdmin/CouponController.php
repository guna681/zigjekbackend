<?php

namespace App\Http\Controllers\RestaurantAdmin;

use App\Http\Controllers\Controller;
use App\Http\Service\RestaurantAdmin\CouponService;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Validator;

Class CouponController extends Controller
{

    /**
     * List the all coupon and status
     * @param pageNumber
     * return the perpage 10 coupondetails
     * @return json
     */
    public function listCoupon(request $request)
    {
        $couponService  = new CouponService();
        $response       = $couponService->listCouponsService($request);
        $responseData   = Defaults::encode($response);
        return $responseData;
    }

       /**
     * Add the Coupon for outlets.
     * @param  outletId ,couponName,couponType, discount,dateStart,dateEnd,couponStatus required
     * @retrun boolean
     *
      */
    public function addCoupon(request $request)
    {
        $response   = new Response();
        $rules      = [
                       'couponName'   => 'required',
                       'discountPerscentage'   => 'required',
                       'maxDiscount'     => 'required',
                       'couponStatus' => 'required'
                      ];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                       = $validator->messages();
            $response->error            = Common::error_true;
            $response->errorMessage     = $data->first();

        } else {

            $couponService  = new CouponService();
            $response                   = $couponService->addCoupon($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

        public function editCoupon(request $request)
    {
        $response   = new Response();
        $rules      = [
                       'id'           => 'required',
                       'couponName'   => 'required',
                       'discountPerscentage'   => 'required',
                       'maxDiscount'     => 'required',
                       'couponStatus' => 'required'
                      ];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                       = $validator->messages();
            $response->error            = Common::error_true;
            $response->errorMessage     = $data->first();

        } else {

            $couponService  = new CouponService();
            $response                   = $couponService->editCoupon($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

/**
     * List the all coupon and status
     * @param pageNumber
     * return the perpage 10 coupondetails
     * @return json
     */
    public function restaurantCouponList(request $request)
    {
        $couponService  = new CouponService();
        $response       = $couponService->restaurantCouponListService($request);
        $responseData   = Defaults::encode($response);
        return $responseData;
    }

       public function deleteCoupon(request $request)
    {
        $response   = new Response();
        $rules      = [
                       'id'           => 'required',
                      ];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                       = $validator->messages();
            $response->error            = Common::error_true;
            $response->errorMessage     = $data->first();

        } else {

            $couponService  = new CouponService();
            $response                   = $couponService->deleteCoupon($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    } 
}
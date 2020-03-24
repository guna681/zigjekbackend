<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Service\Admin\CouponService;
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
    public function listCoupons(request $request)
    {

        $bannerService  = new BannerService();
        $response       = $CouponService->listCoupons($request);
        $responseData   = Defaults::encode($response);
        return $responseData;
    }
}
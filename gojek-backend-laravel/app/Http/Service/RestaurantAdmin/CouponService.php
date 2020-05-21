<?php
namespace App\Http\Service\RestaurantAdmin;

// use App\Coupon;
use App\Http\Repository\CouponRepostitory;
use App\Http\Service\DataService;
use App\Http\Utility\Common;
use App\Restaurant;
use Illuminate\Support\Facades\Hash;
use App\Http\Libraries\ServiceProviders\GuzzleServiceProvider;
use App\Http\Repository\OutletsRepostitory;
use App\Outlets;
use Auth;

Class  CouponService{

    public function addCoupon($arg)
    {
        $couponRepostitory      = new CouponRepostitory();
        $coupon                 = $couponRepostitory->adminAddCoupon($arg);
        $data                   = new DataService();
        if ($coupon) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.addSuccess');

        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;
    }


    public function listCouponsService($data)
    {
        $couponRepostitory       = new CouponRepostitory();
        $listCoupon                 = $couponRepostitory->listCoupons($data);
        $data                    = new DataService();
        if ($listCoupon) {
            $data->error         = Common::error_false;
            $data->errorMessage  = __('validation.sucess');
            $data->CouponList       = $listCoupon;
        } else {
            $data->error         = Common::error_true;
            $data->errorMessage  = __('validation.failure');
            $data->banners       = $listCoupon;
        }

        return $data;
    }

        public function editCoupon($arg)
    {
        $couponRepostitory      = new CouponRepostitory();
        $coupon                 = $couponRepostitory->editCoupon($arg);
        $data                   = new DataService();
        if ($coupon) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.editCoupon');

        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;
    }
    
      public function restaurantCouponListService($data)
    {
        $couponRepostitory       = new CouponRepostitory();
        $listCoupon                 = $couponRepostitory->restaurantCouponList($data);
        $data                    = new DataService();
        if ($listCoupon) {
            $data->error         = Common::error_false;
            $data->errorMessage  = __('validation.sucess');
            $data->CouponList       = $listCoupon;
        } else {
            $data->error         = Common::error_true;
            $data->errorMessage  = __('validation.failure');
            $data->banners       = $listCoupon;
        }

        return $data;
    }  
}
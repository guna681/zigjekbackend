<?php


namespace App\Http\Service\Admin;

use App\Http\Utility\Common;
use App\Http\Repository\CouponRepostitory;
use App\Http\Service\MailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

Class CouponService
{


    // public function addBanner($arg)
    // {
    //     $bannerRepostitory      = new BannerRepostitory();
    //     $banners                = $bannerRepostitory->addBanner($arg);
    //     $data                   = new DataService();
    //     if ($banners) {
    //         $data->error        = Common::error_false;
    //         $data->errorMessage = __('validation.addSuccess');

    //     } else {
    //         $data->error        = Common::error_true;
    //         $data->errorMessage = __('validation.failure');
    //     }

    //     return $data;
    // }


    public function listCoupons($request)
    {
        $bannerRepostitory       = new BannerRepostitory();
        $banners                 = $couponRepostitory->listCoupons($request);
        $data                    = new DataService();
        if ($banners) {
            $data->error         = Common::error_false;
            $data->errorMessage  = __('validation.sucess');
            $data->banners       = $banners;
        } else {
            $data->error         = Common::error_true;
            $data->errorMessage  = __('validation.failure');
            $data->banners       = $banners;
        }

        return $data;
    }
}
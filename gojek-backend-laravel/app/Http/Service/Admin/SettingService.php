<?php

namespace App\Http\Service\Admin;

use App\Http\Utility\Common;
use App\Http\Utility\Constant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Repository\IntegrationSettingRepository;
use App\Http\Repository\SettingRepostitory;


Class  SettingService
{


    public function getSettingData()
    {

        $settingRepostitory  = new SettingRepostitory();
        $data                = new DataService();
        $data->error         = Common::error_false;
        $data->errorMessage  = trans('validation.sucess');
        $data->outletRadius  = $settingRepostitory->getValue(Constant::OUTLET_RADIUS);
        $data->resendOtpTime = $settingRepostitory->getValue(Constant::RESEND_OTP_TIME);
        $data->showRatingPopupAfter = $settingRepostitory->getValue(Constant::SHOW_RATING_POPUP_AFTER);
        return $data;
    }

    public function updateSettingValue($arg)
    {
        $settingRepostitory = new SettingRepostitory();
        $result     = $settingRepostitory->updateSettingValue($arg);
        $data       = new DataService();
        if ($result) {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.sucess');
        } else {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.failure');
        }
        return $data;

    }


}
    
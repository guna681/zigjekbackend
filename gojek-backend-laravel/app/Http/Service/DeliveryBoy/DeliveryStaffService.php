<?php

namespace App\Http\Service\DeliveryBoy;

use App\Http\Repository\DeliveryStaffRepostitory;
use App\Http\Service\DataService;
use App\Http\Utility\Constant;
use Illuminate\Cache\Repository;
use App\Http\Repository\SettingRepostitory;
use App\Http\Repository\CurrencyRepostitory;
use App\Http\Utility\Defaults;
use App\Http\Utility\Common;
use App\DeliveryStaff;
use Hash;
use Auth;
use DB;
Class DeliveryStaffService
{

    public function getOtp($arg)
    {

        $deliveryStaffRepostitory   = new DeliveryStaffRepostitory();
        $deliverystaffs             = $deliveryStaffRepostitory->getMobile($arg);
        $data                       = new DataService();
        $settingRepository          = new SettingRepostitory();


            if ($deliverystaffs) {

                $checkcountryCode = $deliveryStaffRepostitory->getMobile($arg);

                if($checkcountryCode){

                $loginSetting = $settingRepository->getValue(Constant::DELIVERYSTAFF_LOGIN_SETTING);

                if ($loginSetting) {

                    $data->error                 = Common::error_false;
                    $data->errorMessage          = __('validation.otpSend');
                    $data->isNewDeliveryStaff    = Common::error_false;//false  is exitusers
                    $data->otpNumber             = Defaults::otpnumber();
                    $data->timeDelayForOtp       = $settingRepository->resendOtpTime();
                    $deliverystaff               = new DeliveryStaff();
                    $deliverystaff->mobileNumber = $arg->mobileNumber;
                    $deliverystaff->otpNumber    = $data->otpNumber;
                    $deliveryStaffRepostitory->putOtp($deliverystaff);

                } else {

                    $data->error              = Common::error_false;
                    $data->errorMessage       = __('validation.sucess');
                    $data->isNewDeliveryStaff = Common::error_false;
                }

                }else{

                    $data->error        = Common::error_true;
                    $data->errorMessage = __('validation.countryCode');

                }

            } else {
                $data->error              = Common::error_false;
                $data->errorMessage       = __('validation.otpSend');
                $data->isNewDeliveryStaff = Common::error_true;
                $data->otpNumber          = Defaults::otpnumber();
                $data->timeDelayForOtp    = $settingRepository->resendOtpTime();
                $deliverystaff               = new DeliveryStaff();
                $deliverystaff->mobileNumber = $arg->mobileNumber;
                $deliverystaff->otpNumber    = $data->otpNumber;
                $deliveryStaffRepostitory->putOtp($deliverystaff);

            }


        return $data;

    }


    public function loginPassword($arg)
    {
        $deliveryStaffRepostitory   = new DeliveryStaffRepostitory();
        $staff                      = $deliveryStaffRepostitory->getExistMobile($arg);
        $data                       = new DataService();
        $refreshToken = DB::table('oauth_access_tokens')
            ->where('name','staff Token')
            ->where('user_id', $staff->id)
            ->update([
                'revoked' => true
            ]);
        if( Hash::check($arg->password, $staff->password)) {
            if ($staff->isApproved == 1) {

                $data->error        = Common::error_false;
                $data->errorMessage = __('validation.sucess');
                $data->accesstoken  = $staff->createToken('staff Token')->accessToken;
                $data->staffDetails = $staff;
            } else {

                $data->error        = Common::error_true;
                $data->errorMessage = __('validation.approved');

            }
        }else{
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.login');
        }


        return $data;

    }

    public function loginOtp($arg)
    {

        $deliveryStaffRepostitory  = new DeliveryStaffRepostitory();
        $verify = $deliveryStaffRepostitory->verifyOtp($arg);
        $data   = new DataService();
        if ($verify) {
            $staff = $deliveryStaffRepostitory->getMobile($arg);
            if ($staff) {
                $accessToken = $staff->createToken('Delivery_Boy')->accessToken;
                $data->error        = Common::error_false;
                $data->errorMessage = trans('validation.sucess');
                $data->isNewDeliveryStaff = Common::error_false;//false  is exitusers
                $data->accessToken  = $accessToken;
                $data->otpVerified  = Common::error_true;
                $data->staffDetails = $staff;
            } else {
                $data->error        =Common::error_false;
                $data->errorMessage =trans('validation.isSignup');
                $data->otpVerified  =Common::error_true;
                $data->isNewDeliveryStaff=Common::error_true;//true is new user
            }
            $deliveryStaffRepostitory->removeOtp($arg);
        } else {
            $data->error=Common::error_true;
            $data->errorMessage=trans('validation.invalidOtp');
            $data->otpVerified=Common::error_false;
        }

        return $data;
    }



    public function verifyOtp($arg)
    {

        $deliveryStaffRepostitory = new DeliveryStaffRepostitory();
        $users     = $deliveryStaffRepostitory->verifyOtp($arg);
        $data      = new DataService();
        if ($users) {

            $data->error         = Common::error_false;
            $data->errorMessage  = trans('validation.isOtp');
            $data->isOtpVerified = Common::error_true;
        } else {
            $data->error         = Common::error_true;
            $data->errorMessage  = trans('validation.invalidOtp');
            $data->isOtpVerified = Common::error_false;
        }
        return $data;

    }


    public function resendOtp($arg)
    {
        $deliveryStaffRepostitory = new DeliveryStaffRepostitory();
        $staff      = $deliveryStaffRepostitory->getResendOtp($arg);
        $data       = new DataService();
        if ($staff) {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.resendOtp');
            $data->otpNumber    = (int)$staff->otpNumber;
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = trans('validation.existotp');
        }

        return $data;
    }

    public function forgotPassword($arg)
    {

        $deliveryStaffRepostitory = new DeliveryStaffRepostitory();
        $exist  = $deliveryStaffRepostitory->getExistMobile($arg);
        $data   = new DataService();
        if ($exist) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.otpSend');
            $data->otpNumber    = Defaults::otpnumber();
            $settingRepostitory = new SettingRepostitory();
            $data->timeDelayForOtp = $settingRepostitory->resendOtpTime();
            $staffOtp = new \stdClass();
            $staffOtp->otpNumber    = $data->otpNumber;
            $staffOtp->mobileNumber = $arg->mobileNumber;
            $otp = $deliveryStaffRepostitory->putOtp($staffOtp);
        } else {
            $data->error = Common::error_true;
            $data->errorMessage = __('validation.notMobile');

        }
        return $data;

    }


    public function changePassword($arg)
    {
        $deliveryStaffRepostitory = new DeliveryStaffRepostitory();
        $update  = $deliveryStaffRepostitory->putPassword($arg);
        $data    = new DataService();
        if (!empty($update)) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.isPassword');
            $deliveryStaffRepostitory->removeOtp($arg);
        } else {
            $data->error         = Common::error_true;
            $data->error_message = __('validation.noPassword');
        }
        return $data;

    }


    //Signup module


    public function getSignupFields()
    {
        $deliveryStaffRepostitory = new DeliveryStaffRepostitory();
        $settingRepostitory       = new SettingRepostitory();
        $page = 3;
        for ($i=1; $i <= $page ; $i++) {
            $results    = new \stdClass();
            $get        = $deliveryStaffRepostitory->getFields($i);
            $results->fields    = $get->flatten();
            $results->page      = $i;
            $results->pageName  = $settingRepostitory->getValue($i);
            $fields[]           = $results;
        }
        $data  = new DataService();
        if ($fields) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->signupFields =$fields;
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
            $data->signupFields = [];

        }
        return $data;
    }



    public function staffSignup($arg)
    {

         $deliveryStaffRepostitory  = new DeliveryStaffRepostitory();
         $insert =$deliveryStaffRepostitory->addDeliveryStaff($arg);
         $data = new DataService();
         if($insert){
             $data->error = Common::error_false;
             $data->errorMessage = __('validation.sucess');
         }else{
             $data->error = Common::error_true;
             $data->errorMessage = __('validation.failure');
         }
         return $data;

    }


    public function getProfile()
    {
        $staffId = Auth::guard('deliveryboy')->user()->id;
        $deliveryStaffRepostitory = new DeliveryStaffRepostitory();
        $profile = $deliveryStaffRepostitory->getProfile($staffId);
        $data    = new DataService();
        if ($profile) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->staffProfile = $profile;
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }
        return $data;

    }


    public function getStaticPages(){
        $settingRepostitory=new SettingRepostitory();
        $pages=$settingRepostitory->getValue(Constant::FAQ_PAGE);
        $data=new DataService();
        if($pages){
            $data->error=Common::error_false;
            $data->errorMessage=trans('validation.sucess');
            $data->faqPages=$pages;
        }else{
            $data->error=Common::error_false;
            $data->errorMessage=trans('validation.failure');
            $data->faqPages="";

        }

        return $data;
    }


    public function updateLocation($arg){

        $staffId = Auth::guard('deliveryboy')->user()->id;
        $deliveryStaffRepostitory = new DeliveryStaffRepostitory();
        $update = $deliveryStaffRepostitory->updateLocation($staffId,$arg);
        $data    = new DataService();
        if ($update) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }
        return $data;

    }


    public function updateTripStatus($tripStatus)
    {

        $staffId = Auth::guard('deliveryboy')->user()->id;
        $deliveryStaffRepostitory = new DeliveryStaffRepostitory();
        $update  = $deliveryStaffRepostitory->updateTripStatus($tripStatus,$staffId);
        $data    = new DataService();
        if ($update) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }


    public function updateDeviceToken($arg)
    {

        $staffId  = Auth::guard('deliveryboy')->user()->id;
        $deliveryStaffRepostitory = new DeliveryStaffRepostitory();
        $update   = $deliveryStaffRepostitory->updateDeviceToken($arg, $staffId);
        $data     = new DataService();
        if ($update) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }
        return $data;

    }


    public function homePage()
    {
        $staffId    = Auth::guard('deliveryboy')->user()->id;
        $deliveryStaffRepostitory = new DeliveryStaffRepostitory();
        $staff      = $deliveryStaffRepostitory->getProfile($staffId);
        $data       = new DataService();

        if ($staff) {

            $currencyRepostitory = new CurrencyRepostitory();
            $currency            = $currencyRepostitory->getCurrency();
            $settingRepository   = new SettingRepostitory();
            $commission          = $settingRepository->getValue(Constant::DELIVERYBOYCOMMISSION);

            $today           = date('Y-m-d', time());
            $todayIncome     = $deliveryStaffRepostitory->getIncomeDetails($staffId, $today);
            $yesterday       = date('Y-m-d', strtotime('yesterday'));

            $yesterdayIncome = $deliveryStaffRepostitory->getIncomeDetails($staffId, $yesterday);
            $weekIncome      = $deliveryStaffRepostitory->weekIncomeDetails($staffId);

            $incomedetail                        = new \stdClass();
            $incomedetail->todayDisplayName      = __('validation.today');
            $incomedetail->todayCost             = $currency . number_format(($commission / 100) * $todayIncome->cost, 0);
            $incomedetail->todayOrders           = $todayIncome->orders;
            $incomedetail->yesterdayDisplayName  = __('validation.yesterday');
            $incomedetail->yesterdayCost         = $currency . number_format(($commission / 100) * $yesterdayIncome->cost, 0);
            $incomedetail->yesterdayOrders       = $yesterdayIncome->orders;
            $incomedetail->weekDisplayName       = __('validation.week');
            $incomedetail->weekCost              = $currency . number_format(($commission / 100) * $weekIncome->cost);
            $incomedetail->weekOrders            = $weekIncome->orders;
            $incomedetail->tripStatus            = $staff->status;

            $data->error          = Common::error_false;
            $data->errorMessage   = __('validation.sucess');
            $data->deliveryDetail = $incomedetail;

        } else {
            $data->error          = Common::error_false;
            $data->errorMessage   = __('validation.failure');
        }

        return $data;

    }



    public function staffLogout()
    {

        $staffId    = Auth::guard('deliveryboy')->user()->id;
       $deliveryStaffRepostitory = new DeliveryStaffRepostitory();
        $update   = $deliveryStaffRepostitory->staffLogout($staffId);
        $data     = new DataService();
        if ($update) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }
        return $data;


    }




}
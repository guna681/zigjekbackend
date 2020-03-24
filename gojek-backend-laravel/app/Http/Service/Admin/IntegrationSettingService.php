<?php

namespace App\Http\Service\Admin;

use App\Http\Utility\Common;
use App\Http\Utility\Constant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Repository\IntegrationSettingRepository;
use App\Http\Repository\SettingRepostitory;
use App\Http\Libraries\StripeProvider\StripeService;


Class  IntegrationSettingService
{

    public function getIntegrationSettingData()
    {

        $integrationSettingRepository = new IntegrationSettingRepository();
        $data                   = new DataService();
        $data->error            = Common::error_false;
        $data->errorMessage     = trans('validation.sucess');
        $data->smsGateway       = $integrationSettingRepository->integrationSettingValue(Constant::SMS_GATEWAY);
        $data->paymentGateWay   = $integrationSettingRepository->integrationSettingValue(Constant::PAYMENT_GATEWAY);
        $data->loginType        = $integrationSettingRepository->integrationSettingValue(Constant::LOGIN_TYPE);
        $data->pushNotification = $integrationSettingRepository->integrationSettingValue(Constant::PUSH_NOTIFICATION);
        return $data;
    }

    public function updateStatus($arg)
    {

        $integrationSettingRepository = new IntegrationSettingRepository();
        $result     = $integrationSettingRepository->putStatus($arg);
        $data       = new DataService();
        if ($result) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.sucess');

        }
        return $data;
    }


    public function getMapKey()
    {

        $integrationSettingRepository = new IntegrationSettingRepository();
        $data                = new DataService();
        $data->error         = Common::error_false;
        $data->errorMessage  = trans('validation.sucess');
        $data->androidMapkey = $integrationSettingRepository->getkeyValue(Constant::ANDROID_MAPkEY);
        $data->iosMapkey     = $integrationSettingRepository->getkeyValue(Constant::IOS_MAPkEY);
        return $data;
    }


    public function updateMapKey($arg)
    {

        $integrationSettingRepository = new IntegrationSettingRepository();
        $result     = $integrationSettingRepository->putMapKey($arg);
        $data       = new DataService();
        if ($result) {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = trans('validation.failure');
        }
        return $data;
    }

    public function getChargesKey()
    {

        $integrationSettingRepository = new IntegrationSettingRepository();
        $data                = new DataService();
        $data->error         = Common::error_false;
        $data->errorMessage  = trans('validation.sucess');
        $data->data = $integrationSettingRepository->getChargesValue();
        return $data;
    }


    public function updateChargesKey($arg)
    {

        $integrationSettingRepository = new IntegrationSettingRepository();
        $result     = $integrationSettingRepository->updateChargesValue($arg);
        $data       = new DataService();
        if ($result) {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = trans('validation.failure');
        }
        return $data;
    }    

    public function getPushNotification()
    {

        $integrationSettingRepository = new IntegrationSettingRepository();
        $data               = new DataService();
        $data->error        = Common::error_false;
        $data->errorMessage = trans('validation.sucess');
        $data->FireBasekey  = $integrationSettingRepository->getkeyValue(Constant::FIREBASE_KEY);
        return $data;
    }

    public function updateFirebaseKey($arg)
    {

        $integrationSettingRepository = new IntegrationSettingRepository();
        $result     = $integrationSettingRepository->putFirebaseKey($arg);
        $data       = new DataService();
        if ($result) {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = trans('validation.failure');
        }
        return $data;
    }

    public function updateStripeKey($arg)
    {

        $integrationSettingRepository = new IntegrationSettingRepository();
        $stripeKeys     = array('secretKey' => $arg->secretKey, 'publishableKey' => $arg->publishableKey);
        $result         = $integrationSettingRepository->putStripeKey($stripeKeys);
        $data           = new DataService();
        if ($result) {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = trans('validation.failure');
        }
        return $data;
    }


    public function updateTwilioKey($arg)
    {

        $integrationSettingRepository = new IntegrationSettingRepository();
        $result  = $integrationSettingRepository->putTwilioKey($arg);
        $data    = new DataService();
        if ($result) {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.sucess');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = trans('validation.failure');
        }
        return $data;
    }

    public function getStripeKey()
    {

        $integrationSettingRepository = new IntegrationSettingRepository();
        $data               = new DataService();
        $data->error        = Common::error_false;
        $data->errorMessage = trans('validation.sucess');
        $stripe             = $integrationSettingRepository->getStripeKey();
        $obj = new \stdClass();
        $obj->name       = $stripe->name;
        $obj->key        = $stripe->key;
        $obj->value      = unserialize($stripe->value);
        $obj->isSelected = $stripe->status;
        $data->stripeData= $obj;
        return $data;        
    }

    public function getTwilioKey()
    {

        $integrationSettingRepository = new IntegrationSettingRepository();
        $data               = new DataService();
        $data->error        = Common::error_false;
        $data->errorMessage = trans('validation.sucess');
        $Twilio   = $integrationSettingRepository->getTwilioKey();
        $obj = new \stdClass();
        $obj->name       = $Twilio->name;
        $obj->key        = $Twilio->key;
        $obj->value      = $Twilio->value;
        $obj->isSelected = $Twilio->status;
        $data->twilioData= $obj;
        return $data;
    }

}
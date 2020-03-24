<?php

namespace App\Http\Repository;

use App\User;
use App\Address;
use App\IntegrationSetting;
use App\Setting;
use App\AppConfig;
use App\Http\Utility\Constant;
use DB;

class IntegrationSettingRepository
{


    public function integrationSettingValue($type)
    {
        $data = array();
        $data = IntegrationSetting::select('name', 'status as isSelected', 'id')
                                  ->where('type', $type)
                                  ->get();

        return $data;
    }

    public function getkeyValue($key)
    {
        $data = array();
        $data = IntegrationSetting::select('value')
                                 ->where('key', $key)
                                 ->first();
        return $data->value;
    }


    public function getPaymentGatewayDetails($gatewayId)
    {
        $path    = url('/') . '/images/';
        $data = IntegrationSetting::select(DB::raw("id,name,CONCAT('$path',image)as image,status"))
                              ->where('id',$gatewayId)->first();

        return $data;

    }
    public function putStatus($data)
    {
        if ($data->settingType != Constant::PAYMENT_GATEWAY) {
            $query = IntegrationSetting::where('type', $data->settingType)->update(['status' => 0]);
        }
        try {
            $results = IntegrationSetting::where('key', $data->settingKey)->update(['status' => $data->status]);

            $settingkey = (string)$data->settingKey;
            $otp = strcmp($settingkey, Constant::OTP_LOGIN);
            $isotplogin = 'isOtpLogin';
            if ($otp == 0) {
                $results = Setting::where('key', $isotplogin)->update(['value' => 1]);
            }
            $password = strcmp($settingkey, Constant::PASSWORD_LOGIN);
            if ($password == 0) {
                $results = Setting::where('key', $isotplogin)->update(['value' => 0]);
            }

        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            return false;
        }
        return true;
    }

    public function putMapKey($data)
    {
        DB::beginTransaction();
        try {
            $query = IntegrationSetting::where(['type' => Constant::MAP_KEY, 'key' => Constant::ANDROID_MAPkEY])
                                      ->update(['Value' => $data->androidMapKey]);

            $query = IntegrationSetting::where(['type' => Constant::MAP_KEY, 'key' => Constant::IOS_MAPkEY])
                                        ->update(['Value' => $data->iosMapKey]);
        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        if (empty($data)) {
            return false;
        }
        return true;

    }

    public function putFirebaseKey($data)
    {
        DB::beginTransaction();
        try {
            $query = IntegrationSetting::where(['type' => Constant::PUSH_NOTIFICATION, 'key' => Constant::FIREBASE_KEY])
                                       ->update(['Value' => $data->firebaseKey]);

        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        if (empty($data)) {
            return false;
        }
        return true;

    }

    public function putStripeKey($data)
    {
        DB::beginTransaction();
        try {

            $query = IntegrationSetting::where(['type' => Constant::PAYMENT_GATEWAY, 'key' => Constant::STRIPE])
                                     ->update(['Value' => serialize($data)]);

        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        if (empty($data)) {
            return false;
        }
        return true;
    }

    public function putTwilioKey($data)
    {
        DB::beginTransaction();
        try {

            $query = IntegrationSetting::where(['type' => Constant::SMS_GATEWAY, 'key' => Constant::TWILIO_KEY])
                                        ->update(['Value' => $data->secretKey]);

        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        if (empty($data)) {
            return false;
        }
        return true;
    }


    public function getStripeKey()
    {
        $data = array();
        $data = IntegrationSetting::select('name', 'status', 'key', 'value')
                                ->where(['type' => Constant::PAYMENT_GATEWAY, 'key' => Constant::STRIPE])
                                ->first();

        return $data;
    }


    public function getTwilioKey()
    {
        $data = array();
        $data = IntegrationSetting::select('name', 'status', 'key', 'value')
                               ->where(['type' => Constant::SMS_GATEWAY, 'key' => Constant::TWILIO_KEY])
                               ->first();

        return $data;

    }

    public function getChargesValue()
    {
  
        $data = AppConfig::select()
                      ->get();
        return $data;
    }

    public function updateChargesValue($data)
    {

        DB::beginTransaction();
        try {
            if ($data->deliverycharges) {
                $query = AppConfig::where(['FieldName' => Constant::DELIVERY_CHARGES ])
                                      ->update(['Value' => $data->deliverycharges]);
            } else if ($data->distancecharges) {
                $query = AppConfig::where(['FieldName' => Constant::DISTANCE_CHARGES ])
                                      ->update(['Value' => $data->distancecharges]);
            } else if ($data->perkmcharges) {
                $query = AppConfig::where(['FieldName' => Constant::PER_KM_CHARGES ])
                ->update(['Value' => $data->perkmcharges]);
            } else if ($data->freedistance) {
                $query = AppConfig::where(['FieldName' => Constant::DISTANCE_THRESHOLD ])
                ->update(['Value' => $data->freedistance]);
            }
            
            

            

                                                    
        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();            
            DB::rollBack();
            return false;
        }
        DB::commit();
        if (empty($data)) {
            return false;
        }
        return true;

    }


}
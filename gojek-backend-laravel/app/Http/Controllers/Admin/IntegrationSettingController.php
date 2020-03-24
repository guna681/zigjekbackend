<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Utility\Constant;
use App\Http\Service\Admin\IntegrationSettingService;
use Illuminate\Support\Facades\Response;
use Validator;
use Mail;

Class  IntegrationSettingController extends Controller
{
    public function getIntegrationSetting(request $request)
    {
        $integrationSettingService = new IntegrationSettingService();
        $response     = $integrationSettingService->getIntegrationSettingData();
        $responseData = Defaults::encode($response);
        return $responseData;
    }

    public function getMapKey(request $request)
    {
        $integrationSettingService = new IntegrationSettingService();
        $response     = $integrationSettingService->getMapKey();
        $responseData = Defaults::encode($response);
        return $responseData;
    }

    public function getChargesKey(request $request)
    {
        $integrationSettingService = new IntegrationSettingService();
        $response     = $integrationSettingService->getChargesKey();
        $responseData = Defaults::encode($response);
        return $responseData;
    }

    public function getPushNotification(request $request)
    {
        $integrationSettingService = new IntegrationSettingService();
        $response     = $integrationSettingService->getPushNotification();
        $responseData = Defaults::encode($response);
        return $responseData;
    }

    public function updateStatus(request $request)
    {
        $response   = new Response();
        $rules      = ['settingKey'  => 'required',
                       'settingType' => 'required',
                       'status'      => 'required',
                      ];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();

        } else {
            $integrationSettingService = new IntegrationSettingService();
            $response   = $integrationSettingService->updateStatus($request);
        }
        $responsedata  = Defaults::encode($response);
        return $responsedata;

    }


    public function updateMapKey(request $request)
    {
        $response   = new Response();
        $rules      = ['androidMapKey' => 'required',
                       'iosMapKey' => 'required',
                      ];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();

        } else {
            $integrationSettingService = new IntegrationSettingService();
            $response  = $integrationSettingService->updateMapKey($request);
        }
        $responsedata  = Defaults::encode($response);
        return $responsedata;
    }

    public function updateChargesKey(request $request)
    {
        $response   = new Response();
            $integrationSettingService = new IntegrationSettingService();
            $response  = $integrationSettingService->updateChargesKey($request);
        
        $responsedata  = Defaults::encode($response);
        return $responsedata;
    }

    public function updateFirebaseKey(request $request)
    {
        $response   = new Response();
        $rules      = ['firebaseKey' => 'required',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();

        } else {
            $integrationSettingService = new IntegrationSettingService();
            $response  = $integrationSettingService->updateFirebaseKey($request);
        }
        $responsedata  = Defaults::encode($response);
        return $responsedata;
    }

    public function updateStripeKey(request $request)
    {
        $response   = new Response();
        $rules      = [ 'secretKey'      => 'required',
                        'publishableKey' => 'required',
                       ];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();

        } else {
            $integrationSettingService = new IntegrationSettingService();
            $response  = $integrationSettingService->updateStripeKey($request);
        }
        $responsedata  = Defaults::encode($response);
        return $responsedata;
    }

    public function updateTwilioKey(request $request)
    {
        $response   = new Response();
        $rules      = ['secretKey' => 'required',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();

        } else {
            $integrationSettingService = new IntegrationSettingService();
            $response  = $integrationSettingService->updateTwilioKey($request);
        }
        $responsedata  = Defaults::encode($response);
        return $responsedata;
    }

    public function getStripeKey(request $request)
    {        
      
        $integrationSettingService = new IntegrationSettingService();
        $response     = $integrationSettingService->getStripeKey();
        $responseData = Defaults::encode($response);
        return $responseData;
    }

    public function getTwilioKey(request $request)
    {
        $integrationSettingService = new IntegrationSettingService();
        $response     = $integrationSettingService->getTwilioKey();
        $responseData = Defaults::encode($response);
        return $responseData;

    }

}
   
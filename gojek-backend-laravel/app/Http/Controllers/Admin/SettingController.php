<?php


namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Utility\Constant;
use App\Http\Service\Admin\SettingService;
use Illuminate\Support\Facades\Response;
use Validator;
use Mail;


Class  SettingController extends Controller
{

    public function getSetting(request $request)
    {
        $settingService  = new SettingService();
        $response        = $settingService->getSettingData();
        $responseData    = Defaults::encode($response);
        return $responseData;
    }

    public function updateSettingValue(request $request)
    {
        $response   = new Response();
        $rules      = ['settingKey'   => 'required',
                       'settingValue' => 'required',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();

        } else {
            $settingService = new SettingService();
            $response       = $settingService->updateSettingValue($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }


}
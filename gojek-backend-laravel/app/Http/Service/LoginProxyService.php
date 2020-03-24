<?php

namespace App\Http\Service;


use App\Http\Utility\Common;
use Illuminate\Support\Facades\Hash;
use App\Http\Libraries\ServiceProviders\GuzzleServiceProvider;
use League\OAuth2\Server\AuthorizationServer;


class LoginProxyService
{


    public function attemptLogin($request,$authServer)
    {

        $data = new DataService();


        switch ($request->userType)
        {
            case 'user' :
                $model = 'App\User';
                $invalid = $this->checkValidateUser($request, $model);
                if ($invalid) {
                    $clientId = 2;
                    $data->error        = Common::error_false;
                    $data->errorMessage = __('validation.isLogin');
                    $data->accessToken  = GuzzleServiceProvider::getToken($request, $clientId);
                } else {
                    $data->error        = Common::error_true;
                    $data->errorMessage = __('validation.login');
                }
                return $data;
                break;

            case 'admin':
                $model = 'App\Administrator';
                $invalid = $this->checkValidateUser($request, $model);
                if ($invalid) {
                    $clientId = 3;
                    $accessToken  = GuzzleServiceProvider::getToken($request, $clientId,$authServer);
                } else {
                    $accessToken  = false;
                }
                return $accessToken;
                break;

            case 'restaurantadmin':
                $model = 'App\Outlets';
                $invalid = $this->checkValidateUser($request, $model);
                if ($invalid) {
                    $clientId = 4;
                    $data->error        = Common::error_false;
                    $data->errorMessage = __('validation.isLogin');
                    $data->accessToken  = GuzzleServiceProvider::getToken($request, $clientId);
                } else {
                    $data->error        = Common::error_true;
                    $data->errorMessage = __('validation.login');
                }
                return $data;
                break;
            case 'deliveryboy':
                $model = 'App\DeliveryStaff';
                $invalid = $this->checkValidateUser($request, $model);
                if ($invalid) {
                    $clientId = 5;
                    $data->error        = Common::error_false;
                    $data->errorMessage = __('validation.isLogin');
                    $data->accessToken  = GuzzleServiceProvider::getToken($request, $clientId);
                } else {
                    $data->error        = Common::error_true;
                    $data->errorMessage = __('validation.login');
                }
                return $data;
                break;
            default :

                return false;
        }

    }


    public function checkValidateUser($request, $model)
    {

        if (method_exists($model, 'findForPassport')) {
            $user = (new $model)->findForPassport($request->email);
        } else {
            $user = (new $model)->where('email', $request->email)->first();
        }


        if (!$user) {

            return $data = false;
        } elseif (method_exists($user, 'validateForPassportPasswordGrant')) {

            if (!$user->validateForPassportPasswordGrant($request->password)) {

                return $data = false;
            }
        } elseif (!Hash::check($request->password, $user->password)) {

            return $data = false;
        }
        return $data = true;

    }


}
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Utility\RequestData;
use App\Http\Service\Admin\LoginService;
use App\Http\Repository\UserRepository;
use Illuminate\Support\Facades\Response;
use League\OAuth2\Server\AuthorizationServer;
use Validator;

Class LoginController extends Controller
{


    public function loginAdmin(request $request,AuthorizationServer $authServer)
    {
        $rules     = ['email'    => 'required|email',
                      'password' => 'required|min:6'];
        $response  = new Response();
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $loginService           = new LoginService();
            $response               = $loginService->adminLogin($request,$authServer);


        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }




    public function adminLogin(request $request,AuthorizationServer $authServer)
    {
        $rules     = ['email'    => 'required|email|exists:Administrator',
                      'password' => 'required|min:6'];
        $response  = new Response();
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $loginService           = new LoginService();
            $response               = $loginService->adminLogin($request,$authServer);

        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }




    public function logoutAdmin(request $request)
    {
        $response = new Response();

        if (Auth::check()) {
            $request->user()->token()->revoke();
        }

        $response->error        = Common::error_false;
        $response->errorMessage = __('validation.sucess');
        return Defaults::encode($response);
    }


}

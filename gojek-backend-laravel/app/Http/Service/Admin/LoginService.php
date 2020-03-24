<?php

namespace App\Http\Service\Admin;

use App\Http\Utility\Constant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Repository\UserRepository;
use App\Http\Service\AppconfigService;
use App\Http\Repository\LocationRepository;
use App\Http\Service\LoginProxyService;
use App\Http\Libraries\ServiceProviders\GuzzleServiceProvider;
use App\User;
use Symfony\Component\VarDumper\Cloner\Data;

Class LoginService{


    public function adminLogin($arg,$authServer)
    {
        $loginProxyService = new LoginProxyService();
        $arg['userType'] = Constant::ADMIN;
        $data            = new DataService();

        $userRepository = new UserRepository();
        
        $userExist = $userRepository->getEmail($arg->email);


            $accesstoken          = $userExist->createToken('Token Name')->accessToken;


        if($userExist){
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.isLogin');
            $data->accessToken  = $accesstoken;
            $userRepository     =new UserRepository();
            $admin              =$userRepository->getEmail($arg->email);
            $data->adminDetails =$admin;
            $locationRepository =new LocationRepository();
            $city=$locationRepository->getSelectedCity();
            if($city){
                $data->isSelectedCity=Common::error_true;
            }else{
                $data->isSelectedCity=Common::error_false;
            }
        }else{
            $data->error = Common::error_true;
            $data->errorMessage = __('validation.login');

        }

        return $data;
    }



	public  function loginAdmin($arg){
		$adminDetails=new User();
		$adminDetails->email    =$arg->email;
		$adminDetails->password =$arg->password;
		$adminDetails->configUrl=url('/');			
		$accessToken=GuzzleServiceProvider::getUserToken($adminDetails);
		$data= new DataService();
		if($accessToken){				
			$data->error       =Common::error_false;
			$data->errorMessage=trans('validation.sucess');
			$data->accessToken =$accessToken; 

		}else{
			$data->error       =Common::error_true;
		    $data->errorMessage=trans('validation.invalidAdmin');

		}		

   		 return $data;
	}
}

<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Service\UserService;
use App\Http\Service\PaymentService;
use App\Http\Service\SettingService;
use App\Http\Service\MailService;
use App\Http\Repository\CurrencyRepostitory;
use App\Http\Repository\UserRepository;
use App\Http\Repository\SettingRepostitory;
use App\Http\Utility\BasicValidation;
use App\Http\Utility\Constant;
use Illuminate\Support\Facades\Response;
use Validator;
use Illuminate\Validation\Rule;

Class  UserController extends Controller
{

    public function getloginSetting(request $request)
    {

        $response               = new Response();
        $response->error        = Common::error_false;
        $response->errorMessage = __('validation.sucess');
        $settingService                 = new SettingService();
        $getLoginSetting                = $settingService->getValue(Constant::LOGIN_SETTING);
        $response->termsAndConditions   = $settingService->getValue(Constant::TERMS_AND_CONDITIONS);
        $response->iosMapKey            = $settingService->getIntegrationValue(Constant::IOS_MAPkEY);
        $response->androidMapKey        = $settingService->getIntegrationValue(Constant::ANDROID_MAPkEY);
        $response->browserKey           = $settingService->getIntegrationValue(Constant::BROWSER_KEY);
        $currencyRepostitory            = new CurrencyRepostitory();
        $response->currency             = $currencyRepostitory->getCurrency();
	    if ($getLoginSetting) {
            $response->isPassword = Common::error_false;
        } else {
            $response->isPassword = Common::error_true;
        }
		$responsedata           = Defaults::encode($response);
		return $responsedata;
	}


    public function checkAvailability(request $request)
    {
        $response       = new Response();
        $rules          = ['mobileNumber' => 'required|max:15|min:7',
                           'countryCode'  => 'required|min:2',];
        $validator      = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();

        } else {
            $userService            = new UserService();
            $response               = $userService->getOtp($request);

        }
        $responsedata  = Defaults::encode($response);
        return $responsedata;

    }

    public function userSignup(request $request)
    {
        $response   = new Response();
        $rules      = ['userName'     => 'required|min:2',
                       'mobileNumber' => 'required|max:15|min:7|unique:Users',
                       'countryCode'  => 'required|min:2',
                       'email'        => 'required|email|unique:Users',
                       'loginType'     => 'required|min:2',
                       'udId'         => 'required',
                       'otpNumber'    => 'required|numeric',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService    = new UserService();
            if ($request->loginType == 'NORMAL') {
            $response       = $userService->addUser($request); 
            } else {
              $response       = $userService->addSocialUser($request);
        }
        
    }
    $responsedata = Defaults::encode($response);
        return $responsedata;
}


    public function userWithPasswordSignup(request $request)
    {
        $response   = new Response();
        $rules      = ['userName'     => 'required|min:2',
                       'mobileNumber' => 'required|max:15|min:7|unique:Users',
                       'countryCode'  => 'required|min:2',
                       'email'        => 'required|email|unique:Users',
                       'password'     => 'required|min:4',
                       'udId'         => 'required',
                       'otpNumber'    => 'required|numeric',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService    = new UserService();
            $response       = $userService->addUser($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    public function socialSignup(request $request)
    {
        $response   = new Response();
        $rules      = ['userName'     => 'required|min:2',
                       'mobileNumber' => 'required|max:15|min:7|unique:Users',
                       'countryCode'  => 'required|min:2',
                       'email'        => 'required|email|unique:Users',
                       'udId'         => 'required',
                       'otpNumber'    => 'required|numeric',
                   ];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService    = new UserService();
            $response       = $userService->addSocialUser($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    public function userWithoutPasswordSignup(request $request)
    {
        $response       = new Response();
        $rules          = ['userName'      => 'required|min:2',
                           'mobileNumber'  => 'required|max:15|min:7|unique:Users',
                           'countryCode'   => 'required|min:2',
                           'email'         => 'required|email|unique:Users',
                           'udId'          => 'required',
                           'otpNumber'     => 'required|numeric',];
        $validator      = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService            = new UserService();
            $response               = $userService->addUser($request);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;
    }



    public function userPasswordLogin(request $request)
    {
        $response       = new Response();
        $rules          = ['mobileNumber'  => 'required|max:15|min:7|exists:Users',
                           'countryCode'   => 'required|min:2',
                           'password'      => 'required|min:4',
                           'udId'          => 'required',];
        $validator      = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService            = new UserService();
            $response               = $userService->passwordLogin($request);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;
    }

    public function userOtpLogin(request $request)
    {
        $response   = new Response();
        $rules      = ['mobileNumber' => 'required|max:15|min:7',
                       'countryCode'  => 'required|min:2',
                       'otpNumber'    => 'required|numeric',
                       'udId'         => 'required',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService            = new UserService();
            $response               = $userService->loginOtp($request);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;
    }

    public function socialLogin(request $request)
    {
        $response       = new Response();
        $rules          = ['socialToken'  => 'required|max:100|min:5',
                           'loginType'   => 'required|min:1',
                            ];
        $validator      = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService            = new UserService();
            $response               = $userService->socialLogin($request);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;
    }

    public function CheckSocialUserAvailability(request $request)
    {
        $response       = new Response();
        // $rules          = ['email'  => 'required',
        //                    ];
        $validator      = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService            = new UserService();
            $response               = $userService->CheckSocialUserAvailability($request);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;
    }

    public function forgotPassword(request $request)
    {
        $response   = new Response();
        $rules      = ['mobileNumber' => 'required|max:15|min:7',
                       'countryCode'  => 'required|min:2',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService            = new UserService();
            $response               = $userService->forgotPassword($request->mobileNumber);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;
    }

    public function otpVerification(request $request)
    {
        $response    = new Response();
        $rules       = ['mobileNumber' => 'required|max:15|min:7',
                        'countryCode'  => 'required|min:2',
                        'otpNumber'    => 'required|numeric'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService            = new UserService();
            $response               = $userService->verifyOtp($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    public function resendOtp(request $request)
    {
        $response    = new Response();
        $rules       = ['mobileNumber'  => 'required|max:15|min:7',
                        'countryCode'   => 'required|min:2',];
        $validator      = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService            = new UserService();
            $response               = $userService->resendOtp($request);
        }
        $responsedata  = Defaults::encode($response);
        return $responsedata;

    }


    public function changePassword(request $request)
    {
        $response    = new Response();
        $rules       = ['mobileNumber'  => 'required|max:15|min:7',
                        'countryCode'   => 'required|min:2',
                        'password'      => 'required|min:4',
                        'otpNumber'     => 'required|string'];
        $validator   = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService            = new UserService();
            $response               = $userService->changePassword($request);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;
    }

    public function getProfile(request $request)
    {
        $userId       = Auth::guard('api')->user()->id;
        $userService  = new UserService();
        $response     = $userService->getProfile($userId);
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    public function updateProfile(request $request)
    {
        $response   = new Response();
        $userId     = Auth::guard('api')->user()->id;
        $rules      = ['email'    => 'required|email|unique:Users,email,' . $userId,
                       'userName' => 'required',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService            = new UserService();
            $response               = $userService->putProfile($request, $userId);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


    public function getVerfiyEmail(request $request)
    {

        $userService    = new UserService();
        $response       = $userService->verifyMail($request->otpNumber);
        if ($response) {
            return view('VerificationSuccess');
        } else {
            return view('VerificationFailure');
        }

    }

    public function getStaticpages(request $request)
    {
        $userService    = new UserService();
        $response       = $userService->getStaticPages();
        $responsedata   = Defaults::encode($response);
        return $responsedata;
    }
	

	/* user address module */


	public  function getAddress(request $request){
		 $userId        =Auth::guard('api')->user()->Id;
		 $userService   = new UserService();
		 $response      =$userService->getAddress($userId);
		 $responsedata  =Defaults::encode($response);
		 return $responsedata;
	}

    public function addAddress(request $request)
    {
        $response   = new Response();
        $userId     = Auth::guard('api')->user()->Id;
        $typerules  =['Home','Work','other'];
        $rules      = array('location'     => 'required',
                             'houseFlatNo' => 'required',
                             'type'        => 'required',
                             'latitude'    => 'required|numeric',
                             'longitude'   => 'required|numeric',
                             'type'        => ['required',
                                                Rule::unique('Address', 'type')->whereIn('type',$typerules)
                                                        ->where(function ($query) use ($userId) {
                                                               $query->where('userId', $userId)
                                                               ->where('isDeleted',0);
                                                         }),
                                              ],
                            );
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService            = new UserService();
            $response               = $userService->addAddress($request, $userId);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


    public function updateAddress(request $request)
    {
        $response   = new Response();
        $userId     = Auth::guard('api')->user()->Id;
        $typerules  = ['Home','Work','other'];

        $rules     = array('addressId'      => 'required|numeric',
                            'location'      => 'required',
                            'houseFlatNo'   => 'required',
                            'latitude'      => 'required|numeric',
                            'longitude'     => 'required|numeric',
                             'type'        =>  ['required',
                                                // Rule::unique('Address', 'type')->whereIn('type',$typerules)
                                                //         ->where(function ($query) use ($userId) {
                                                //                $query
                                                //                ->where('userId', '!=', $userId)
                                                //                ->where('isDeleted',0);
                                                //          }),
                                              ],

                            );







        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService            = new UserService();
            $response               = $userService->putAddress($request, $userId);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


    public function getCurrentAddress(request $request)
    {

        $userId     = Auth::guard('api')->user()->Id;
        
        $response   = new Response();
        $rules      = ['latitude'  => 'required|numeric',
                       'longitude' => 'required|numeric',
                       'location'  => 'required',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService            = new UserService();
            $response               = $userService->getCurrentAddress($request, $userId);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


    public function setCurrentAddress(request $request)
    {
        $userId     = Auth::guard('api')->user()->Id;
        $response   = new Response();
        $rules      = array('addressId' => 'required|numeric',);
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService            = new UserService();
            $response               = $userService->setCurrentAddress($request->addressId, $userId);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    public function destroyAddress(request $request)
    {
        $userId       = Auth::guard('api')->user()->Id;
        $response     = new Response();
        $rules        = array('addressId' => 'required|numeric',);
        $validator    = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $userService            = new UserService();
            $response               = $userService->destroyAddress($request->addressId, $userId);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;
    }

    public function logOut(request $request)
    {
        $userService  = new UserService();
        $response     = $userService->logOut();
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }



    /*
     * update devicetoken and ostype  api
     * @param fcmtoken
     * @param ostype
     * @return json
     * */

    public function updateDeviceToken(request $request)
    {
        $response   = new \stdClass();
        $rules      = ['deviceToken' => 'required', 'osType' => 'required'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {

            $userService = new UserService();
            $response    = $userService->updateDeviceToken($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }

    public function testingMail(request $request)
    {
        $userService =  new UserService();
        $data = $userService->testingmail();
    }

    public function generateEphemeralKey(request $request){

        $userId       = Auth::guard('api')->user()->id;
        $response     = new Response();
        $rules        = array('api_version' => 'required|string',);
        $validator    = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $paymentService            = new PaymentService();
            $response               = $paymentService->paymentEphemeralService($request);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;
        
    }

    public function addCard(request $request)
    {
        $response       = new Response();
        $rules          = ['token' => 'required'];
        $validator      = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();

        } else {
            $paymentService            = new PaymentService();
            $response               = $paymentService->addCardService($request->token);

        }
        $responsedata  = Defaults::encode($response);
        return $responsedata;

    }

    public function listCard(request $request)
    {

        $paymentService            = new PaymentService();
        $response               = $paymentService->listCardService($request);
        $responsedata  = Defaults::encode($response);
        return $responsedata;

    }

        public function deleteCard(request $request)
    {

        $paymentService            = new PaymentService();
        $response               = $paymentService->deleteCardService($request);
        $responsedata  = Defaults::encode($response);
        return $responsedata;

    }

    public function userLogout(request $request)
    {
        if (Auth::check()) {
            $request->user()->token()->revoke();
        }
        $userService = new UserService();
        $response    = $userService->userLogout($request);

        $responsedata  = Defaults::encode($response);
        return $responsedata;
    }

    public function createTokenCtrl(request $request) {
        $userService = new UserService();
        $response = new \stdClass();
        $data = $userService->createTokenService($request);
        if ($data) {
            $response->error = Common::error_false;
            $response->data = $data;
        } else {
            $response->error = Common::error_true;
        }
        $responsedata  = Defaults::encode($response);
        return $responsedata;
    }
        /* user address module */


    public  function currentAddress(request $request){
         $userId        =Auth::guard('api')->user()->Id;
         $userService   = new UserService();
         $response      =$userService->currentAddress($userId);
         $responsedata  =Defaults::encode($response);
         return $responsedata;
    }  
}



<?php

namespace App\Http\Service;


use App\Orders;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Repository\UserRepository;
use App\Http\Repository\SettingRepostitory;
use App\Http\Repository\LogActivityRepostitory;
use App\Http\Repository\CartRepostitory;
use App\Http\Service\PaymentService;
use App\Http\Repository\OrderRepostitory;
use App\Http\Service\AppconfigService;
use App\Http\Service\MailService;
use App\Http\Utility\Constant;
use App\Http\Libraries\ServiceProviders\GuzzleServiceProvider;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use App\Address;
use App\LogActivity;
use App\Cart;
use App\User;
use App\Http\Libraries\MessageServiceProvider\TwilioMessageService;
use DB;

Class UserService
{

    public function addUser($arg)
    {
        $userRepository = new UserRepository();        
        $paymentService = new PaymentService();        
        $customerId = $paymentService->setStripeUserIdKey($arg->email);
        $arg->customerId = $customerId;
        $userdata       = $userRepository->addUser($arg);
        $data           = new DataService();
        if (!empty($userdata)) {
            $data->error         = Common::error_false;
            $data->errorMessage  = __('validation.sucess');
            $users               = $userRepository->getUser($userdata);
            $data->token         = $users->createToken('Token Name')->accessToken;
            $data->userDetails   = $users;
            $userRepository->removeOtp($arg);
            $title = __('validation.signupTitle');
            $mailService = new MailService();
            $mailService->setTitle($title);
            $mailService->setReceiver($arg->email);
            $mailService->setTemplate(Constant::SIGNUP);
            $messgeContent=array('userName'=> $arg->userName , 'title'=>__('validation.appName'));
            $mailService->sendMail($messgeContent);
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = trans('validation.query');
        }
        return $data;
    }

   public function addSocialUser($arg)
    {
        $userRepository = new UserRepository();        
        $paymentService = new PaymentService();        
        $customerId = $paymentService->setStripeUserIdKey($arg->email);
        $arg->customerId = $customerId;
        $userdata       = $userRepository->addSocialUser($arg);
        $data           = new DataService();
        if (!empty($userdata)) {
            $data->error         = Common::error_false;
            $data->errorMessage  = __('validation.sucess');
            $users               = $userRepository->getUser($userdata);
            $data->token         = $users->createToken('Token Name')->accessToken;
            $data->userDetails   = $users;
            $userRepository->removeOtp($arg);
            $title = __('validation.signupTitle');
            $mailService = new MailService();
            $mailService->setTitle($title);
            $mailService->setReceiver($arg->email);
            $mailService->setTemplate(Constant::SIGNUP);
            $messgeContent=array('userName'=> $arg->userName , 'title'=>__('validation.appName'));
            $mailService->sendMail($messgeContent);
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = trans('validation.query');
        }
        return $data;
    }

    public function testingmail()
    {
        $mailService = new MailService();
        $userEmail = "ramkumarirs73@gmail.com";

        $templatekey = 'signup';

        $data = array('title'=>'Food delivery App', 'userName'=>'chakra',);

        $mailService->setReceiver($userEmail);
        $mailService->setTemplate($templatekey);
        $mailService->sendMail($data);


    }



    public function getOtp($arg)
    {
        $userRepository = new UserRepository();
        //$existMobile    = $userRepository->getExistMobile($arg->mobileNumber);
        $data           = new DataService();
        
        $users  = $userRepository->getMobileNumber($arg);
        if ($users) {
            $settingRepository = new SettingRepostitory();
            $loginSetting      = $settingRepository->loginSetting();
            if ($loginSetting) {
                $data->error            = Common::error_false;
                $data->errorMessage     = __('validation.otpSend');
                $data->isNewUser        = Common::error_false;//false  is exitusers
                $data->otpNumber        = Defaults::otpnumber();
                $data->timeDelayForOtp  = $settingRepository->resendOtpTime();
                $userOtp = new User();
                $userOtp->otpNumber     = $data->otpNumber;
                $userOtp->mobileNumber  = $arg->mobileNumber;
                $otp = $userRepository->putOtp($userOtp);

            } else {
                $data->error        = Common::error_false;
                $data->errorMessage = __('validation.sucess');
                $data->isNewUser    = Common::error_false;//false  is exitusers
            }
        } else {
            $data->error            = Common::error_false;
            $data->errorMessage     = __('validation.otpSend');
            $data->isNewUser        = Common::error_true;//true  is newusers
            $data->otpNumber        = Defaults::otpnumber();
            $settingRepostitory     = new SettingRepostitory();
            $data->timeDelayForOtp  = $settingRepostitory->resendOtpTime();
            $userOtp = new User();
            $userOtp->otpNumber     = $data->otpNumber;
            $userOtp->mobileNumber  = $arg->mobileNumber;
            $otp = $userRepository->putOtp($userOtp);
        }


        return $data;
    }

    public function resendOtp($arg)
    {
        $userRepository   = new UserRepository();
        $users            = $userRepository->getResendOtp($arg);
        $data             = new DataService();
        if ($users) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.resendOtp');
            $data->otpNumber    = (int)$users->otpNumber;
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = trans('validation.existotp');
        }

        return $data;
    }

    public function passwordLogin($arg)
    {

        $userRepository  = new UserRepository();
        $users           = $userRepository->getExistMobile($arg->mobileNumber);
        $data            = new DataService();
        $refreshToken = DB::table('oauth_access_tokens')
                        ->where('user_id', $users->id)
                        ->whereNull('name')
                        ->update([
                            'revoked' => true
                        ]);
        if ($users) {
            $userDetails    = new Address();
            $userDetails->email     = $users->email;
            $userDetails->password  = $arg->password;
            $userDetails->configUrl = url('/');
            $accessToken            = GuzzleServiceProvider::getUserToken($userDetails);
            if ($accessToken) {
                $data->error        = Common::error_false;
                $data->errorMessage = __('validation.sucess');
                $data->Userdetails  = $users;
                $data->accessToken  = $accessToken;
                $cartdata           = new Cart();
                $cartdata->userId   = $users->id;
                $cartdata->udId     = $arg->udId;
                $update             = $userRepository->putUdid($cartdata);
                //userid updated cart
                $cartRepostitory    = new CartRepostitory();
                $cart               = $cartRepostitory->userIdToCart($cartdata);

            } else {

                $data->error         = Common::error_true;
                $data->errorMessage  = __('validation.login');
            }

        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.login');

        }

        return $data;
    }

    public function loginOtp($arg)
    {
        $userRepository = new UserRepository();
        $userOtp        = $userRepository->verifyOtp($arg);
        $data           = new DataService();
       // if ($userOtp) {
            $users   = $userRepository->getExistMobile($arg->mobileNumber);
            if ($users) {
                $accessToken        = $users->createToken('Token Name')->accessToken;
                $data->error        = Common::error_false;
                $data->errorMessage = trans('validation.sucess');
                $data->isNewUser    = Common::error_false;//false  is exitusers
                $data->accessToken  = $accessToken;
                $data->otpVerified  = Common::error_true;
                $data->UserDetails  = $users;
                // $userRepository->removeOtp($arg);
                // $cartdata          = new Cart();
                // $cartdata->userId  = $users->id;
                // $cartdata->udId    = $arg->udId;
                // $update = $userRepository->putUdid($cartdata);
                //userid updated cart
                // $cartRepostitory = new CartRepostitory();
                // $cart = $cartRepostitory->userIdToCart($cartdata);

            } else {
                $data->error        = Common::error_false;
                $data->errorMessage = __('validation.isSignup');
                $data->otpVerified  = Common::error_true;
                $data->isNewUser    = Common::error_true;//true is new user
                $userRepository->removeOtp($arg);
            }

        // } else {
        //     $data->error        = Common::error_true;
        //     $data->errorMessage = __('validation.invalidOtp');
        //     $data->otpVerified  = Common::error_false;
        // }
        return $data;

    }


            public function socialLogin($arg)
    {

        $userRepository  = new UserRepository();
        $users           = $userRepository->getExistSocialToken($arg);
        $data            = new DataService();
        if (!empty($users)) {
           
                $data->error         = Common::error_false;
                $data->isNewSocialUser = Common::error_false;

                    if ($arg->loginType == $users->loginType) {

                        $userDetails    = new Address();
            $userDetails->email     = $users->email;
            $userDetails->password  = $arg->password;
            $userDetails->configUrl = url('/');
            $accessToken        = $users->createToken('Token Name')->accessToken;
            if ($accessToken) {
                $data->error        = Common::error_false;
                $data->isNewSocialUser = Common::error_true;
                $data->isLogin      = Common::error_true;
                $data->errorMessage = __('validation.sucess');
                $data->Userdetails  = $users;
                $data->accessToken  = $accessToken;
                $cartdata           = new Cart();
                $cartdata->userId   = $users->id;
                $cartdata->udId     = $arg->udId;
                $update             = $userRepository->putUdid($cartdata);
                //userid updated cart
                $cartRepostitory    = new CartRepostitory();
                $cart               = $cartRepostitory->userIdToCart($cartdata);

            } else {

                $data->error         = Common::error_true;
                $data->errorMessage  = __('validation.login');
            }
        } else {
            
              if ($arg->loginType == 'FACEBOOK') {
                $data->errorMessage  = 'Already registered through '.$users->loginType. ' use'. ' '.$users->loginType. ' '. 'login';
                    
                }

                 if ($arg->loginType == 'APPLE') {
                $data->errorMessage  = 'Already registered through '.$users->loginType. ' use'. ' '.$users->loginType. ' '. 'login';
                    
                }
              if ($arg->loginType == 'GOOGLE') {
                $data->errorMessage  = 'Already registered through '.$users->loginType. ' use'. ' '.$users->loginType. ' '. 'login';
                    
                }   
        }
        } else {
            $data->error        = Common::error_false;
            $data->isNewSocialUser = Common::error_true;
            $data->isLogin      = Common::error_false;
            $data->errorMessage = __('validation.invalidSocialUser');

        }

        return $data;
    }
            public function CheckSocialUserAvailability($arg)
    {

        $userRepository  = new UserRepository();
        $users           = $userRepository->getExistSocialToken($arg);
        $data            = new DataService();
        if (!empty($users)) {
           
                $data->error         = Common::error_false;
                $data->isNewSocialUser = Common::error_false;

                    if ($arg->loginType == $users->loginType) {

                        $userDetails    = new Address();
            $userDetails->email     = $users->email;
            $userDetails->password  = $arg->password;
            $userDetails->configUrl = url('/');
            $accessToken        = $users->createToken('Token Name')->accessToken;
            if ($accessToken) {
                $data->error        = Common::error_false;
                $data->isNewSocialUser = Common::error_false;
                $data->errorMessage = __('validation.sucess');
                $data->Userdetails  = $users;
                $data->accessToken  = $accessToken;
                $cartdata           = new Cart();
                $cartdata->userId   = $users->id;
                $cartdata->udId     = $arg->udId;
                $update             = $userRepository->putUdid($cartdata);
                //userid updated cart
                $cartRepostitory    = new CartRepostitory();
                $cart               = $cartRepostitory->userIdToCart($cartdata);

            } else {

                $data->error         = Common::error_true;
                $data->errorMessage  = __('validation.login');
            }
        } else {
            
              if ($arg->loginType == 'FACEBOOK') {
                $data->errorMessage  = 'email Already Exit use'. ' '.$users->loginType. ' '. 'login';
                    
                }

                 if ($arg->loginType == 'APPLE') {
                $data->errorMessage  = 'email Already Exit use' . ' '.$users->loginType. ' '.  'login';
                    
                }
              if ($arg->loginType == 'GOOGLE') {
                $data->errorMessage  = 'email Already Exit use' . ' '.$users->loginType. ' '.  'login';
                    
                }   
        }
        } else {
            $data->error        = Common::error_false;
            $data->isNewSocialUser = Common::error_false;
            $data->errorMessage = __('validation.invalidSocialUser');

        }

        return $data;
    }

    public function forgotPassword($mobileNumber)
    {
        $userRepository = new UserRepository();
        $userdata       = $userRepository->getExistMobile($mobileNumber);
        $data           = new DataService();
        if ($userdata) {
            $data->error            = Common::error_false;
            $data->errorMessage     = trans('validation.otpSend');
            $data->otpNumber        = Defaults::otpnumber();
            $settingRepostitory     = new SettingRepostitory();
            $data->timeDelayForOtp  = $settingRepostitory->resendOtpTime();
            $userOtp            = new User();
            $userOtp->otpNumber     = $data->otpNumber;
            $userOtp->mobileNumber  = $mobileNumber;
            $otp = $userRepository->putOtp($userOtp);
        } else {
            $data->error         = Common::error_true;
            $data->errorMessage  = trans('validation.notMobile');

        }
        return $data;
    }

    public function verifyOtp($arg)
    {
        $userRepository = new UserRepository();
        $users  = $userRepository->verifyOtp($arg);
        $data   = new DataService();
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

    public function changePassword($arg)
    {
        $userRepository = new UserRepository();
        $users          = $userRepository->putPassword($arg);
        $data           = new DataService();
        if (!empty($users)) {
            $data->error         = Common::error_false;
            $data->errorMessage  = __('validation.isPassword');
            $userRepository->removeOtp($arg);
        } else {
            $data->error         = Common::error_true;
            $data->errorMessage = __('validation.noPassword');
        }
        return $data;
    }

    public function getProfile($userId)
    {
        $data               = new DataService();
        $data->error        = Common::error_false;
        $data->errorMessage = trans('validation.sucess');
        $userRepository     = new UserRepository();
        $data->usersDetails = $userRepository->getUser($userId);
        return $data;
    }

    public function putProfile($arg, $userId)
    {

        $userRepository = new UserRepository();
        $update     = $userRepository->editProfile($arg, $userId);
        $exists     = $userRepository->getEmail($arg->email);
        $data       = new DataService();
        if ($exists) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.updatProfile');
        } else {
            $user           = new User();
            $user->userId       = $userId;
            $user->email        = $arg->email;
            $user->otpNumber    = rand(11111, 99999);
            $profileData        = $userRepository->putEmail($user);
            $mailService        = new MailService();
            $mailService->sendEmailConfirm($user);
            if (!empty($profileData)) {
                $data->error        = Common::error_false;
                $data->errorMessage = __('validation.verificationEmail');

            } else {
                $data->error        = Common::error_true;
                $data->errorMessage = __('validation.query');
            }
        }

        return $data;
    }

    public function verifyMail($arg)
    {
        $userRepository = new UserRepository();
        $data           = $userRepository->putProfile($arg);
        return $data;

    }

    public function getAddress($userid)
    {
        $userRepository = new UserRepository();
        $useraddress    = $userRepository->getAddress($userid);
        $data           = new DataService();
        if (!$useraddress->isEmpty()) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->address      = $useraddress;
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = trans('validation.noAddress');
            $data->address      = [];
        }
        return $data;

    }

    public function addAddress($arg, $userId)
    {
        $address         = new Address();
        $address->userId        = $userId;
        $arr1                   = explode(',', $arg->location);
        $arr1                   = array_filter($arr1);
        $address->location      = implode(',', $arr1);//
        $address->houseFlatNo   = $arg->houseFlatNo;
        $address->landMark      = $arg->landMark;
        $address->type          = $arg->type;//1 = home , 2 =work,3 =others
        $address->latitude      = $arg->latitude;
        $address->longitude     = $arg->longitude;
        $fulladdress            = $arg->houseFlatNo . ',' . $arg->location . ',' . $arg->landMark;
        $arr                    = explode(',', $fulladdress);
        $arr1                   = array_filter($arr);
        $address->fullAddress   = implode(',', $arr1);//
        $userRepository         = new UserRepository();
        $useraddress            = $userRepository->addAddress($address);
        $data                   = new DataService();
        if (!empty($useraddress)) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.successAddress');
            $data->addressId    = $useraddress;
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failureAddress');
        }
        return $data;
    }


    public function putAddress($arg, $userId)
    {
        $address                = new Address();
        $address->userId        = $userId;
        $address->addressId     = $arg->addressId;
        $arr1                   = explode(',', $arg->location);
        $arr1                   = array_filter($arr1);
        $address->location      = implode(',', $arr1);//
        $address->houseFlatNo   = $arg->houseFlatNo;

        if ($arg->landMark) {
            $address->landMark  = $arg->landMark;
        } else {
            $address->landMark  = "";
        }

        $fulladdress            = $arg->houseFlatNo . ',' . $arg->location . ',' . $arg->landMark;
        $arr    = explode(',', $fulladdress);
        $arr    = array_filter($arr);

        $address->fullAddress  = implode(',', $arr);//
        $address->type         = $arg->type;
        $address->latitude     = $arg->latitude;
        $address->longitude    = $arg->longitude;

        $userRepository = new UserRepository();
        $checkAddress    = $userRepository->checkAddress($address);
        $data = new DataService();

        if ($checkAddress == NULL) {
          $useraddress    = $userRepository->putAddress($address);

          if (!empty($useraddress)) {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.updateAddress');

        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = trans('validation.noAddress');
        }
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = 'tag Already taken';
        }
         
        return $data;

    }

    public function setCurrentAddress($arg, $userId)
    {
        $address            = new Address();
        $address->userId    = $userId;
        $address->addressId = $arg;

        $userRepository     = new UserRepository();
        $setAddress         = $userRepository->setCurrentAddress($address);

        $data               = new DataService();
        if ($setAddress) {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('Validation.Success');
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = trans('Validation.failure');

        }

        return $data;
    }

    public function getCurrentAddress($arg, $userId)
    {
        $address = new Address();
        $address->userId        = $userId;
        $address->latitude      = $arg->latitude;
        $address->longitude     = $arg->longitude;

        $arr1 = explode(',', $arg->location);
        $arr1 = array_filter($arr1);
        $address->location      = implode(',', $arr1);//
        $address->fullAddress   = implode(',', $arr1);//
        $address->city          = $arg->city;

        $settingService     = new SettingService();
        $address->getAddressDistance = $settingService->getValue(Constant::GET_ADDRESS_DISTANCE);

        $userRepository     = new UserRepository();
        $getAddress = $userRepository->getCurrentAddress($address);

        $data       = new DataService();
        if (!empty($getAddress)) {
            $data->error            = Common::error_false;
            $data->errorMessage     = trans('validation.sucess');
            $data->currentAddress   = $getAddress;
            $data->isCurrentAddress = Common::error_true;
        } else {
            $data->error            = Common::error_false;
            $data->errorMessage     = trans('Validation.failure');
            $data->isCurrentAddress = Common::error_false;

        }
        return $data;
    }

    public function destroyAddress($addressId, $userId)
    {
        $address            = new Address();
        $address->addressId = $addressId;
        $address->userId    = $userId;

        $userRepository     = new UserRepository();
        $results    = $userRepository->deleteAddress($address);

        $data       = new DataService();
        if ($results) {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.isDeletedAddress');
        } else {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.noDeletedAddress');
        }

        return $data;
    }

    public function getStaticPages()
    {
        $settingRepostitory = new SettingRepostitory();
        $pages  = $settingRepostitory->getValue(Constant::FAQ_PAGE);
        $data   = new DataService();
        if ($pages) {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.sucess');
            $data->faqPages     = $pages;
        } else {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.failure');
            $data->faqPages     = "";

        }

        return $data;
    }


    public function logout(){

        $accessToken = $this->auth->user()->token();

        $refreshToken = $this->db
            ->table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        $accessToken->revoke();
    }


    public function updateDeviceToken($arg)
    {

        $userId  = Auth::guard('api')->user()->id;
        $userRepository = new UserRepository();
        $update   = $userRepository->updateDeviceToken($arg, $userId);
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

    public function userLogout()
    {

        $userId  = Auth::guard('api')->user()->id;
        $userRepository = new UserRepository();
        $update   = $userRepository->userLogout($userId);
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

    public function createTokenService($data) {
        $userMobile  = new \stdClass();
        $userMobile->mobileNumber = $data->mobile;
        $userMobile->countryCode = $data->countryCode;
        $userRepository = new UserRepository();
        $userInfo = $userRepository->getMobileNumber($userMobile);

        if($userInfo) {
            $accessToken = $userInfo->createToken('User Access Token')->accessToken;
        } else {
            $accessToken = null;
        }
        return $accessToken;
    }
}



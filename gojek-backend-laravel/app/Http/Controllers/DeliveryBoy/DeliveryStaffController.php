<?php

namespace App\Http\Controllers\DeliveryBoy;

use App\Http\Service\DataService;
use Illuminate\Http\Request;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Utility\Constant;
use App\Http\Service\SettingService;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use App\Http\Repository\SettingRepostitory;
use App\Http\Repository\CurrencyRepostitory;
use App\Http\Service\DeliveryBoy\DeliveryStaffService;
use DB;


use Validator;

Class DeliveryStaffController extends Controller
{
    /**
     * Get DeliveryStaff LoginSetting(password or otp ) api.
     * @retrun json
     **/

    public function getLoginSetting(request $request)
    {


        $response               = new Response();
        $response->error        = Common::error_false;
        $response->errorMessage = __('validation.sucess');
        $settingService                 = new SettingService();
        $getLoginSetting                = $settingService->getValue(Constant::DELIVERYSTAFF_LOGIN_SETTING);
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


    /**
     * Given moboile Number exist or notExist checking api
     * @param  string mobileNumber
     * maximum 11 and minimum 7 required
     * @param  string countryCode
     * minimum 2 required
     * @return json
     */

    public function checkAvailability(request $request)
    {

        $response       = new Response();
        $rules          = ['mobileNumber' => 'required|max:15|min:7',
                           'countryCode' => 'required|min:2',];
        $validator      = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();

        } else {

            $deliveryStaffService   = new DeliveryStaffService();
            $response               = $deliveryStaffService->getOtp($request);
        }
        $responsedata   =  Defaults::encode($response);
        return $responsedata;

    }

    /**
     *  Get the deliveryBoy signup Fields api
     *  @return json
    */

    public function getSignupFields(request $request)
    {
        $deliveryStaffService = new DeliveryStaffService();
        $response             = $deliveryStaffService->getSignupFields();
        $responsedata         = Defaults::encode($response);
        return $responsedata;


    }

    /**
     * DeliveryBoy login using password
     * @param varchar mobileNumber
     * @param varchar password
     * @return json
     *      * */
    public function staffPasswordLogin(request $request)
    {
        $response     = new Response();
        $rules        = ['mobileNumber'  =>'required|max:15|min:7|exists:DeliveryStaff,mobileNumber',
                         'countryCode'   =>'required|min:2',
                         'password'      =>'required|min:4'];
        $validator    = Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage =$data->first();
        }else{
            $deliveryStaffService   = new DeliveryStaffService();
            $response               = $deliveryStaffService->loginPassword($request);
        }

        $responsedata   = Defaults::encode($response);
        return $responsedata;
    }

    /**
     * login with otp api
     * @param mobileNumber,countryCode,otpNumber
     * @return json
     * */

    public function staffOtpLogin(request $request)
    {
        $response   = new Response();
        $rules      = ['mobileNumber' => 'required|max:15|min:7',
                       'countryCode'  => 'required|min:2',
                       'otpNumber'    => 'required|numeric',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $deliveryStaffService   = new DeliveryStaffService();
            $response               = $deliveryStaffService->loginOtp($request);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;

    }



    /**
     * Otp verification api
     * @param mobilenumber , otpnumber
     * @return boolean (true or false)
     */
    public function otpVerification(request $request)
    {

        $response   = new Response();
        $rules      = ['mobileNumber' => 'required|max:15|min:7',
                       'countryCode'  => 'required|min:2',
                       'otpNumber'    => 'required|numeric'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $deliveryStaffService   = new DeliveryStaffService();
            $response               = $deliveryStaffService->verifyOtp($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }

    /**
     * Get the otp for given mobileNumber in api
     * @param mobileNumber ,countrycode
     * @return json
     * */

    public function resendOtp(request $request)
    {
        $response   = new \stdClass();
        $rules      = ['mobileNumber' => 'required|max:15|min:7',
                       'countryCode' => 'required|min:2',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $deliveryStaffService   = new DeliveryStaffService();
            $response               = $deliveryStaffService->resendOtp($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }

    /**
     * ForgotPassword get the otp
     * @param mobileNumber,countryCode
     * @return json
     */

    public function forgotPassword(request $request)
    {

        $response = new  \stdClass();
        $rules    = ['mobileNumber' => 'required|max:15|min:7',
                     'countryCode'  => 'required|min:2',];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $deliveryStaffService   = new DeliveryStaffService();
            $response               = $deliveryStaffService->forgotPassword($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }


    /**
     * change the deliverystaff password api
     * @param mobileNumber ,countrycode,password,otpNumber
     * @return boolean
     * */


    public function changePassword(request $request)
    {

        $response    = new \stdClass();
        $rules       = ['mobileNumber'  => 'required|max:15|min:7',
                        'countryCode'   => 'required|min:2',
                        'password'      => 'required|min:4',
                        'otpNumber'     => 'required|numeric'];
        $validator   = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $deliveryStaffService   = new DeliveryStaffService();
            $response               = $deliveryStaffService->changePassword($request);
        }
        $responsedata   = Defaults::encode($response);
        return $responsedata;

    }

    /**
     * Handles the request to create a new  deliveryboy .
     * @param   $request
     * (images,document,verification details)
     * @return json
     * */

    public function staffSignup(request $request)
    {
        $deliveryStaffService = new DeliveryStaffService();
        $response             = $deliveryStaffService->staffSignup($request->all());
        $responsedata         = Defaults::encode($response);
        return $responsedata;
    }



    /**
     * Deliverystaff signup validation api
     * dynamically validate in keys and values
     *
     */


    public function staffSignupValidation(request $request)
    {
       $response = new \stdClass();
       $keys     = array();

        foreach($request->all() as $key =>$value){



            $getvalidationType =DB::table('DeliveryStaff_Fields')
                                  ->select('FieldType.validationType')
                                  ->join('FieldType','DeliveryStaff_Fields.fieldTypeId','=','FieldType.id')
                                  ->where('DeliveryStaff_Fields.fieldKey',$key)
                                  ->first();

                if($key) {

                    switch ($key) {

                        case 'email' :
                            $keys[$key] = 'required|email|unique:DeliveryStaff';
                            break;
                        case 'mobileNumber':
                            $keys[$key] = 'required|min:7|numeric|unique:DeliveryStaff';
                            break;
                        case 'number':
                            $keys[$key] = 'required|min:4|max:15|numeric';
                            break;
                        case 'text':
                            $keys[$key] = 'required';
                            break;
                        case 'file':
                            $keys[$key] = 'required|mimes:pdf,jpeg,png,jpg,bmp,gif,svg|max:1000';
                            break;
                        case 'name':
                            $keys[$key] = 'required|max:20|min:2|regex:/^[\w-]*$/';
                            break;
                        case 'password':
                            $keys[$key] = 'required|min:4|max:20|';
                            break;    
                       case 'aadharnumber':
                            $keys[$key] = 'required|min:4|max:15|regex:/^[\w-]*$/';
                            break;
                        case 'venicalnumber':
                            $keys[$key] = 'required|min:6|max:20';
                            break; 
                         case 'ifscode':
                            $keys[$key] = 'required|min:6|max:20|regex:/^[\w-]*$/';
                            break;
                         case 'accountnumber':
                            $keys[$key] = 'required|min:6|max:20|regex:/^[\w-]*$/';
                            break;
                        case 'accountholdername':
                            $keys[$key] = 'required|min:2|max:30|regex:/^[\w-]*$/';
                            break; 
                        case 'nameofthebank':
                            $keys[$key] = 'required|min:2|max:30|regex:/^[\w-]*$/';
                            break;                  
                        default:
                            $keys[$key] = 'required';
                            break;
                    }

                }
        }

        $rules       = $keys;
        $validator   = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $errorMessage = $data->first();
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $response->error        = Common::error_false;
            $response->errorMessage = __('validation.sucess');

        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }



    /**
     * Get the profile api
     * @param
     * @return  json(deliveryBoy details)
     */

    public function getProfile(request $request)
    {
        $deliveryStaffService = new DeliveryStaffService();
        $response     = $deliveryStaffService->getProfile();
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }


    public function getStaticpages(request $request)
    {
        $deliveryStaffService    = new DeliveryStaffService();
        $response       = $deliveryStaffService->getStaticPages();
        $responsedata   = Defaults::encode($response);
        return $responsedata;
    }



    /**
     * Delivery staff Location update api.
     * @param latitude and longitude
     * @return void
     * */


    public function updateLocation(request $request)
    {
        $response  = new \stdClass();
        $rules     = ['latitude' => 'required', 'longitude' => 'required'];
        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $deliveryStaffService   = new DeliveryStaffService();
            $response               = $deliveryStaffService->updateLocation($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


    /**
     * Delivery staff trip status update api
     * @param tripstatus
     * @return boolean(true or false)
     * */

    public function updateTripStatus(request $request)
    {

        $response  = new \stdClass();
        $rules     = ['tripStatus'=> 'required'];
        $validator = Validator::make($request->all(),$rules);
        if($validator->fails()){
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        }else{
            $deliveryStaffService   = new DeliveryStaffService();
            $response               = $deliveryStaffService->updateTripStatus($request->tripStatus);
        }

        $responsedata = Defaults::encode($response);
        return $responsedata;

    }



    /**
     * Update device token  api
     * @param fcmToken
     * @param ostype
     * @return json
     * **/

    public function updateDeviceToken(request $request)
    {
        $response   = new \stdClass();
        $rules      = ['fcmToken' => 'required', 'osType' => 'required'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {

            $deliveryStaffService = new DeliveryStaffService();
            $response             = $deliveryStaffService->updateDeviceToken($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }



    /**
     * Show the staff total income details  and online status api
     * @param
     * @return json
     * **/
    public function homePage(request $request)
    {
        $deliveryStaffService = new DeliveryStaffService();
        $response     = $deliveryStaffService->homePage();
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

   
    public function staffLogout(request $request)
    {


         $id = Auth::guard('deliveryboy')->user()->token()->id;

        $refreshToken = DB::table('oauth_access_tokens')
            ->where('id', $id)
            ->update([
                'revoked' => true
            ]);
        $deliveryStaffService = new DeliveryStaffService();
        $response     = $deliveryStaffService->staffLogout();
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


}
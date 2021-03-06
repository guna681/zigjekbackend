<?php


namespace  App\Http\Libraries\StripeProvider;
use App\Http\Utility\Common;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Repository\IntegrationSettingRepository;
use App\Http\Repository\UserRepository;
use App\Http\Utility\Constant;
use Validator;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\BadResponseException;
use Guzzle\Http\Exception\ServerErrorResponseException;
use Cartalyst\Stripe\Laravel\Facades\Stripe;
use Stripe\Error\Card;



class StripeService
{

    public function getStripeServiceApiKey()
    {

        $integrationSettingRepository = new IntegrationSettingRepository();
        $data               = array();
        $data['error']        = Common::error_false;
        $data['errorMessage'] = trans('validation.sucess');
        $stripe             = $integrationSettingRepository->getStripeKey();
        $stripeKey = $stripe['value'];
        return $stripeKey;     
    }

    public function setStripeUserIdKey($email)
    {
        $stripeKey = $this->getStripeServiceApiKey();
        $stripe = Stripe::setApiKey($stripeKey);
            $customer = $stripe->customers()->create([
                'email' => $email,
            ]);
        $customerId = $customer['id'];
        return $customerId;        
    }

    public function stripeCharge($customer_id, $token, $amount , $userEmail)
    {
        // print_r($customer_id);
        // die;
        $stripeKey             = $this->getStripeServiceApiKey();
        $stripe = Stripe::make($stripeKey);
        $charge = $stripe->charges()->create([
            'amount'   => $amount,
            'currency' => 'USD',
            'source' => $token,
            'customer' => $customer_id,
            'description' => 'Payment done from '.$userEmail,
        ]);
        $data               = array();
        $data['error']        = Common::error_false;
        $data['errorMessage'] = trans('validation.sucess');
        return $customer_id;     
    }

    public function setDeviceId($deviceId)
    {
        $this->deviceId =array($deviceId);
    }


    public function setNotificationContent($content)
    {
        $this->content = $content;
    }

    public function generate_ephemeral($data){
        $stripeKey             = $this->getStripeServiceApiKey();
        if($data->api_version)
        {
            try {
                    $stripe_customer_id=Auth::guard('api')->user()->stripeCustomerId;
                        $stripe = Stripe::make($stripeKey);
                        $setkey=\Stripe\Stripe::setApiKey($stripeKey);
                        $key = \Stripe\EphemeralKey::create(
                          array("customer" => $stripe_customer_id),
                          array("stripe_version" => $data->api_version)
                        );
                    return $key;
                }catch (Exception $e) {
                    return $e;
                    exit(http_response_code(500));
                }
        }     
    }

    public static function addCardToCustomer($token){
        $userRepository = new UserRepository();
        $integrationSettingRepository = new IntegrationSettingRepository();
        $data               = array();
        $data['error']        = Common::error_false;
        $data['errorMessage'] = trans('validation.sucess');
        $stripe             = $integrationSettingRepository->getStripeKey();
        $stripeKey = $stripe['value'];
        // $stripe_customer_id=Auth::guard('api')->user()->stripeCustomerId;
        $userId  = Auth::guard('api')->user()->Id;
        $users               = $userRepository->getUser($userId);
        $stripe_customer_id = $users->StripeCustomerID;
        $stripe=Stripe::setApiKey($stripeKey);
        $setkey=\Stripe\Stripe::setApiKey($stripeKey);
        $card = \Stripe\Customer::createSource(
          $stripe_customer_id,
          [
            'source' => $token,
          ]
        );
        $data['data'] = $card;
        return $data;
    }

    public static function listCardOfCustomer($data){
        $userRepository = new UserRepository();
        $integrationSettingRepository = new IntegrationSettingRepository();
        $data               = array();
        $data['error']        = Common::error_false;
        $data['errorMessage'] = trans('validation.sucess');
        $stripe             = $integrationSettingRepository->getStripeKey();
        $stripeKey = $stripe['value'];
        // $stripeKey             = $this->getStripeServiceApiKey();
        $userId  = Auth::guard('api')->user()->Id;
        $users               = $userRepository->getUser($userId);
        // print_r($users);
        // $stripe_customer_id=Auth::guard('api')->Users()->StripeCustomerID;
        $stripe_customer_id = $users->StripeCustomerID;
        // print_r($stripe_customer_id);
        // die;
        $stripe=Stripe::setApiKey($stripeKey);
        $setkey=\Stripe\Stripe::setApiKey($stripeKey);
        $cards = \Stripe\Customer::allSources(
          $stripe_customer_id,
          [
            'limit' => 50,
            'object' => 'card',
          ]
        );
        $response = $cards->data;
        return $response;
    }

      public static function deleteCustomerCard($data){
        
        $cardId = $data->cardId;
        if ($data->token) {
        $token = $data->token;
        } else {
        $userRepository = new UserRepository();        
        $userId     = Auth::guard('api')->user()->Id;
        $listCardData                     = $userRepository->getUser($userId);
        $token      = $listCardData->StripeCustomerID;
        }
        $integrationSettingRepository = new IntegrationSettingRepository();
        $data               = array();
        $data['error']        = Common::error_false;
        $data['errorMessage'] = trans('validation.sucess');
        $stripe             = $integrationSettingRepository->getStripeKey();
        $stripeKey = $stripe['value'];
        // $stripeKey             = $this->getStripeServiceApiKey();
        // $stripe_customer_id=Auth::guard('api')->user()->StripeCustomerID;
        $stripe=Stripe::setApiKey($stripeKey);
        $setkey=\Stripe\Stripe::setApiKey($stripeKey);
        $cards = \Stripe\Customer::deleteSource(
         $token,
         $cardId
        );
        $response = $cards->deleted;
        return $response;
    }  

}
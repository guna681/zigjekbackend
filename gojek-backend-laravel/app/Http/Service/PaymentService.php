<?php

namespace App\Http\Service;


use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Utility\Constant;
use App\Http\Repository\CartRepostitory;
use App\Http\Repository\PaymentRepository;
use App\Http\Libraries\StripeProvider\StripeService;
use Validator;


Class PaymentService
{

    public function listPaymentMethod(){

        $paymentRepository            = new PaymentRepository();
        $paymentGateway               = $paymentRepository->listPayMentGateways();
        $data                         = new DataService();
        if ($paymentGateway) {

            $data->error            = Common::error_false;
            $data->errorMessage     = __('validation.sucess');
            $data->paymentGateway   = $paymentGateway;
        } else {
            $data->error            = Common::error_true;
            $data->errorMessage     = __('validation.failure');
        }

        return $data;
    }

    public function paymentEphemeralService($request){
        $stripeService            = new StripeService();
        $data                     = $stripeService->generate_ephemeral($request);
        return $data;
    }

    public function setStripeUserIdKey($email){
        $stripeService            = new StripeService();
        $data                     = $stripeService->setStripeUserIdKey($email);
        return $data;
    }

    public function stripeCharge($stripeCustomerId , $token , $displayNetAmount , $email){
        $stripeService            = new StripeService();
        $data                     = $stripeService->stripeCharge($stripeCustomerId , $token , $displayNetAmount , $email);
        return $data;
    }
        public function addCardService($token){
        $stripeService            = new StripeService();
        $stripeData = $stripeService->addCardToCustomer($token);
        $data                         = new DataService();
         if ($stripeData) {

            $data->error            = Common::error_false;
            $data->errorMessage     = __('validation.sucess');
            $data->cardList     = $stripeData;
        } else {
            $data->error            = Common::error_true;
            $data->errorMessage     = __('validation.failure');
        }
        return $data;
    }

    public function listCardService($request){
        $stripeService            = new StripeService();
        $listCardData                     = $stripeService->listCardOfCustomer($request);
        $data                         = new DataService();
           if ($listCardData) {
            $data->error            = Common::error_false;
            $data->errorMessage     = __('validation.sucess');
            $data->cardList     = $listCardData;
        } else {
            $data->error            = Common::error_false;
            $data->errorMessage     = __('validation.failure');
            $data->cardList         = [];
        }
        return $data;
    }

    public function deleteCardService($request){
    $stripeService            = new StripeService();
    $listCardData                     = $stripeService->deleteCustomerCard($request);
    $data                         = new DataService();
       if ($listCardData) {
        $data->error            = Common::error_false;
        $data->errorMessage     = __('validation.sucess');
        $data->cardList     = $listCardData;
    } else {
        $data->error            = Common::error_true;
        $data->errorMessage     = __('validation.failure');
    }
    return $data;
}  
}
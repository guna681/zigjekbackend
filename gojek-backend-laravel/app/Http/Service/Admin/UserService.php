<?php

namespace App\Http\Service\Admin;

use App\Dishes;
use App\Http\Repository\CurrencyRepostitory;
use App\Http\Repository\DishRepostitory;
use App\Http\Repository\OrderRepostitory;
use Illuminate\Cache\Repository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Repository\UserRepository;
use App\Http\Repository\SettingRepostitory;
use App\Http\Repository\LogActivityRepostitory;
use App\Http\Repository\CartRepostitory;
use App\Http\Service\AppconfigService;
use App\Http\Service\MailService;
use App\Http\Utility\Constant;
use App\Http\Libraries\ServiceProviders\GuzzleServiceProvider;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;
use App\Address;
use App\Cart;
use App\User;

Class UserService{

    public function addUser($arg)
    {

        $userRepository = new UserRepository();
        $userdata   = $userRepository->addUserAdmin($arg);
        $data       = new DataService();
        if (!empty($userdata)) {
            $data->error        = Common::error_false;
            $data->errorMessage = trans('validation.sucess');
            $users              = $userRepository->getUser($userdata);
            $data->token        = $users->createToken('Token Name')->accessToken;
            $data->userDetails  = $users;
            $mailService = new MailService();
            $mailService->sendMail($arg);

        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = trans('validation.query');
        }
        return $data;
    }


    public function addAddress($arg, $userId)
    {

        $address    = new Address();
        $address->userId      = $userId;
        $address->location    = $arg->location;
        $address->houseFlatNo = $arg->houseFlatNo;
        $address->landMark    = $arg->landMark;
        $address->type        = $arg->type;//1 = home , 2 =work,3 =others
        $address->latitude    = $arg->latitude;
        $address->longitude   = $arg->longitude;
        $userRepository       = new UserRepository();
        $useraddress          = $userRepository->addAddress($address);
        $data = new DataService();
        if (!empty($useraddress)) {
            $data->error         = Common::error_false;
            $data->errorMessage  = trans('validation.successAddress');

        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = trans('validation.failureAddress');
        }
        return $data;
    }



	public function destroyUser($userId){
		$userRepository = new UserRepository();
		$users  =$userRepository->deleteUser($userId);
		$data   =new DataService();
		if($users){
			$data->error       =Common::error_false;
			$data->errorMessage=__('validation.sucess');
		}else{
			$data->error       =Common::error_true;
			$data->errorMessage=__('validation.failure');
		}

		return $data;

	}



	public function getUser($userId){

	    $userRepository = new UserRepository();
	    $users = $userRepository->getUser($userId);
	    $data = new DataService();
	    if($users){
	        $data->error = Common::error_false;
	        $data->errorMessage = __('validation.sucess');
	        $data->users        = $users;
	        $data->address      = $userRepository->getAddress($userId);

        }else{
	        $data->error = Common::error_true;
	        $data->errorMessage = __('validation.failure');
        }

	    return $data;

    }


    public function getUserOrder($arg){

        $orderRepostitory = new OrderRepostitory();
        $orders= $orderRepostitory->getUserOrder($arg->userId,$arg->page);
        $currencyRepostitory    = new CurrencyRepostitory();
        $dishRepostitory         = new DishRepostitory();
        $currency               = $currencyRepostitory->getCurrency();
        $data = new DataService();

        if($orders){

            $data->error = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->orders       =[];
            foreach ($orders as $order) {

                $orderData              = new \StdClass();
                $orderData->orderId     = $order->id;
                $orderData->orderDate   = date($order->created_at);
                $orderData->total       = $currency.$order->netAmount;
                $orderData->orderReferenceId = $order->orderReferenceId;
                $orderData->status           = $order->orderStatus;
                $carts      = $orderRepostitory->getCartDetails($order->id);
                $orderDish  = array();
                $dishes = [];
                foreach ($carts as $cart) {
                    $dish = $dishRepostitory->getDishes($cart->dishId);
                    $dishes[]= $dish->dishName . ' ' . 'X' . $cart->quantity;
                }
                $orderData->dishes = implode(',',$dishes);
                $data->orders[]    =$orderData;
            }
        }else{
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }
        return $data;

    }

}

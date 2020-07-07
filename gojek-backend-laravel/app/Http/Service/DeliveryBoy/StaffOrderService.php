<?php

namespace App\Http\Service\DeliveryBoy;


use Auth;
use App\User;
use App\Outlets;
use App\Orders;
use App\Dishes;
use App\Http\Utility\Common;
use App\Http\Service\DataService;
use App\Http\Service\OrderService;
use App\Http\Repository\StaffOrderRepostitory;
use App\Http\Repository\OrderRepostitory;
use App\Http\Repository\OutletsRepostitory;
use App\Http\Repository\UserRepository;
use App\Http\Repository\CurrencyRepostitory;
use App\Http\Service\RestaurantAdmin\OrderManagementService;
use App\Http\Libraries\ServiceProviders\FCMPushNotificationServiceProvider;
use App\Http\Repository\DeliveryStaffRepostitory;

Class StaffOrderService
{


    public function listPastOrders()
    {

        $staffId    = Auth::guard('deliveryboy')->user()->id;
        $staffOrderRepostitory = new StaffOrderRepostitory();
        $lists      = $staffOrderRepostitory->listPastOrders($staffId);
        $data       = new DataService();
        if ($lists) {

            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.listOrders');

            $userRepostitory        = new UserRepository();
            $outletsRepostitory     = new OutletsRepostitory();
            $currencyRepostitory    = new CurrencyRepostitory();
            $currency               = $currencyRepostitory->getCurrency();

            $pastOrders  = array();
            foreach ($lists as $list) {

                $orders     = new Orders();
                $user       = $userRepostitory->getUser($list->userId);

                $userData = new User();
                $userData->userName             = $user->userName;
                $userData->userMobileNumber     = $user->mobileNumber;
                $userData->userAddress          = $list->deliveryAddress;
                $userData->orderRefferenceId    = $list->orderReferenceId;
                $userData->netAmount            = $currency.$list->netAmount;
                $userData->paymentType          = ($list->PaymentTypeId == '10') ? __('validation.payedCash') : __('validation.payedCard');

                $orders->usersDetails = $userData;
                
                $outlet      = $outletsRepostitory->getOutlet($list->outletId);
                $outletData                     = new  Outlets();
                $outletData->outletName         = $outlet->name;
                $outletData->outletAddress      = $outlet->addressLineOne. ' ,'. $outlet->addressLineTwo . $outlet->street . ' ,'. $outlet->area. ' ,' . $outlet->city.'.';
                $outletData->outletMobileNumber = $outlet->contactNumber;
                $outletData->orderStatus        = $list->orderStatus;
                $orders->outletDetails          = $outletData;

                $orders->orderId                = $list->id;
                array_push($pastOrders, $orders);

            }
            $data->listPastOrders = $pastOrders;
        } else {

            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.noOrders');
        }

        return $data;
    }


    public function viewOrder($arg)
    {

        $staffId   = Auth::guard('deliveryboy')->user()->id;
        $staffOrderRepostitory = new StaffOrderRepostitory();
        $order     = $staffOrderRepostitory->getOrder($arg->orderId,$staffId);
        $data      = new DataService();

        if ($order) {

            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');

            $userRepostitory       = new UserRepository();
            $outletsRepostitory    = new OutletsRepostitory();
            $orderRepostitory      = new OrderRepostitory();
            $currencyRepostitory   = new CurrencyRepostitory();
            $currency = $currencyRepostitory->getCurrency();
            $orders = new Orders();
            $orders->orderStatus        = $order->orderStatus;
            $orders->orderReferenceId   = $order->orderReferenceId;
            $orders->orderStatusTime    = date('h:i:s A', strtotime($order->updated_at));

            //oulets
            $outlet = $outletsRepostitory->getOutlet($order->outletId);

            $orders->outletName         = $outlet->name;
            $orders->outletAddress      = $outlet->addressLineOne. ' ,'. $outlet->addressLineTwo . ',' .$outlet->street . ' ,'. $outlet->area. ' ,' . $outlet->city.'.';
            $orders->outletMobileNumber = $outlet->contactNumber;
            $orders->outletAddressLat = strval(floatval($outlet->latitude));
            $orders->outletAddressLong = strval(floatval($outlet->longitude));
            $orders->orderSuggestions  = $order->orderSuggestions;

      




            $users = $userRepostitory->getUser($order->userId);

            $orders->userName         = $users->userName;
            $orders->userMobileNumber = $users->mobileNumber;
            $orders->userAddress      = $order->deliveryAddress;

            // user address lat and long

            $usersAddress = $userRepostitory->getUserAddress($order->deliveryAddressId);
            $usersAddress = $usersAddress[0];           
            $orders->userAddressLat   = strval(round($usersAddress->latitude, 6));
            $orders->userAddressLong  = strval(round($usersAddress->longitude, 6));

            $carts = $orderRepostitory->orderDish($order->id);
                        $orderDish  = array();

             foreach ($carts as $cart) {


                $dishes               = new Dishes();
                $dishes->dishplayDish = $cart->dishName . ' ' . 'X' . $cart->quantity;
                $dishes->isVeg        = $cart->isVeg;
                $dishes->quantity     =$cart->quantity;


                $orderCustomisationItems = $orderRepostitory->orderCustomisationItems($cart['id']);


                if (empty($orderCustomisationItems)) {

                    $customisationTotal = $orderCustomisationItems->reduce(function ($carry, $item) {
                        return $carry + $item->price;
                    });

                    $dishes->dishTotal = ($dish->price + $customisationTotal) * $cart->quantity;

                } else {

                    $dishes->dishTotal = $cart->price * $cart->quantity;
                }
                $dishes->displayPrice = $currency .$dishes->dishTotal;

                array_push($orderDish, $dishes);

            }
             $orderService = new OrderService();
             $orders->dishes = $orderDish;
          //   $orders->dishes           = $orderService->getOrderDish($carts);


            $orders->netAmount        = $currency . number_format($order->netAmount, 2);
            $orders->displayNetAmount = ($order->PaymentTypeId == '10') ? __('validation.payedCash')  : __('validation.payedCard');
            
            $orders->charges = $orderService->getCharges($order->outletId,array_flatten( $orderDish),$order->couponName, $orders->displayNetAmount);
            $data->orderDetails = $orders;

        } else {

            $data->error = Common::error_true;
            $data->errorMessage = __('validation.noOrders');

        }

        return $data;
    }



    public function getOrder(){
        $staffId = Auth::guard('deliveryboy')->user()->id;
        $staffOrderRepostitory  = new StaffOrderRepostitory();
        $orders= $staffOrderRepostitory->getCurrentOrder($staffId);
        $data = new DataService();
        if($orders){
            $data->error = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $orderManagementService = new OrderManagementService();
            $response               = $orderManagementService->getOrders($orders);
            $data->orders = $orders;

        }else{
            $data->error = Common::error_true;
            $data->errorMessage = __('validation.failure');
            $data->orders = (object)array();
        }
        return $data;
    }


    public function getAssignedOrder(){

        $staffId = Auth::guard('deliveryboy')->user()->id;
        $staffOrderRepostitory  = new StaffOrderRepostitory();
        $orders= $staffOrderRepostitory->getAssignedOrder($staffId);
        $data = new DataService();
        if($orders){
            $data->error = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->orders = $orders;

        }else{
            $data->error = Common::error_true;
            $data->errorMessage = __('validation.failure');
            $data->orders = (object)array();
        }
        return $data;
    }




    public function acceptOrder($arg)
    {
        $staffId     = Auth::guard('deliveryboy')->user()->id;
        $staffOrderRepostitory = new StaffOrderRepostitory();
        $orderStatus = $staffOrderRepostitory->acceptOrder($arg->orderId, $staffId);
        $status = 1;
        $updateProvider = $staffOrderRepostitory->deliveryUpdateProvider($staffId, $status);
        $data        = new DataService();
        if ($orderStatus) {
        $origin = array();
        $destination = array();
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.accepted');

            $order=$staffOrderRepostitory->getOrder($arg->orderId,$staffId);

            $userRepostitory    = new UserRepository();
            $deliveryStaffRepostitory    = new DeliveryStaffRepostitory();
            $outletsRepostitory   = new OutletsRepostitory();
            $orderRepostitory     = new OrderRepostitory();

            $providerLatLog           =$deliveryStaffRepostitory->getProfile($staffId);
            array_push($origin, $providerLatLog->latitude, $providerLatLog->longitude);

            $outletLatLog           =$outletsRepostitory->getOutlet($order->outletId);
           
            array_push($destination, $outletLatLog->latitude, $outletLatLog->longitude);

            
            $outletToRestaurantDistance  = $this->distanceTo($origin, $destination);
            $totalDistance      =$order->lastMile + $outletToRestaurantDistance;

            $totalTime = $totalDistance /3;   //30 km/hr 3speed

            $etaInMinutes = $totalTime + $outletLatLog->preparationTime;

            $roundOfMinutes = round($etaInMinutes,0,PHP_ROUND_HALF_UP);
             $addEtaMinutesToCurrentTime = 'now +'.$roundOfMinutes.' minutes';
             
             $etaInTimestamp = date('Y-m-d H:i:s', strtotime($addEtaMinutesToCurrentTime));
     
            $updatefirstMile              = $orderRepostitory->updateFirstMile($arg->orderId,$outletToRestaurantDistance,$etaInTimestamp);


            $user               =$userRepostitory->getUser($order['userId']);
            $title              =__('validation.acceptedOrder');
            $notificationData   = array();
            $notificationData['message']     = $user['userName'].' '.__('validation.acceptedOrder');
            $notificationData['os']          = $user['os'];
            $notificationData['body']        = 'accepted';
            $notificationData['deviceToken'] = $user['deviceToken'];
            $notificationData['orderId']     = $arg->orderId;
            $pushNotification = new FCMPushNotificationServiceProvider();
            $pushNotification->setTitle($title);
            $data->status =$pushNotification->sendPushNotification($notificationData);

        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }

    public  function distanceTo($current,$outlet) {
        $miles = rad2deg(acos((sin(deg2rad($current[0]))*sin(deg2rad($outlet[0]))) + (cos(deg2rad($current[0]))*cos(deg2rad($outlet[0]))*cos(deg2rad($current[1]-$outlet[1])))));
                         
        $kilometers = $miles * 111.13384;
      return $kilometers;

    }

    public function rejectOrder($arg)
    {
        $staffId     = Auth::guard('deliveryboy')->user()->id;
        $staffOrderRepostitory = new StaffOrderRepostitory();
        $orderStatus = $staffOrderRepostitory->rejectOrder($arg->orderId, $staffId);
        $status = 0;
        $updateproviderStatus = $staffOrderRepostitory->deliveryUpdateProvider($staffId, $status);
        $data        = new DataService();
        if ($orderStatus) {

            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.rejected');

        } else {

            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }


    public function pickedupOrder($arg){


        $staffId  = Auth::guard('deliveryboy')->user()->id;
        $staffOrderRepostitory = new StaffOrderRepostitory();
        $orderStatus = $staffOrderRepostitory->pickedupOrder($arg->orderId,$staffId);
        $data   = new DataService();

        if($orderStatus){

            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.pickedup');

            $order=$staffOrderRepostitory->getOrder($arg->orderId,$staffId);
            $userRepostitory = new UserRepository();
            $user =$userRepostitory->getUser($order['userId']);


            //notification
            $title              =__('validation.pickedupOrder');
            $notificationData   = array();
            $notificationData['message']     =$user['userName'].' '.__('validation.pickedupOrder');
            $notificationData['os']          = $user['os'];
            $notificationData['body']        = 'pickedup';
            $notificationData['deviceToken'] = $user['deviceToken'];
            $notificationData['orderId']     = $arg->orderId;


            $pushNotification = new FCMPushNotificationServiceProvider();
            $pushNotification->setTitle($title);
            $data->status =$pushNotification->sendPushNotification($notificationData);

        }else{

            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;
    }    


    public function deliveredOrder($arg)
    {

        $staffId     = Auth::guard('deliveryboy')->user()->id;
        $staffOrderRepostitory = new StaffOrderRepostitory();
        $orderStatus = $staffOrderRepostitory->deliveredOrder($arg->orderId, $staffId);
        $deleteBlockList = $staffOrderRepostitory->deleteBlockList($arg->orderId);

        $status = 0;
        $deliveryboyStatus = $staffOrderRepostitory->deliveryUpdateProvider($staffId, $status);
        $data        = new DataService();
        if ($orderStatus) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.delivered');
            $order=$staffOrderRepostitory->getOrder($arg->orderId,$staffId);
            $userRepostitory = new UserRepository();
            $user =$userRepostitory->getUser($order['userId']);

            $staffOrderRepostitory->updateDeliveryStaffEarnings($staffId, $order['providerEarnings']);

            //notification
            $title              =__('validation.delivered');
            $notificationData   = array();
            $notificationData['message']     = $user['userName'].' '.__('validation.deliveredOrder');
            $notificationData['os']          = $user['os'];
            $notificationData['body']         = 'delivered';                                             
            $notificationData['deviceToken'] = $user['deviceToken'];
            $notificationData['orderId']     = $arg->orderId;

            $pushNotification = new FCMPushNotificationServiceProvider();
            $pushNotification->setTitle($title);
            $data->status =$pushNotification->sendPushNotification($notificationData);

        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }
        return $data;
    }



    public function deliveryBoyEarning($data){

        $staffId = Auth::guard('deliveryboy')->user()->id;
        $staffOrderRepostitory  = new StaffOrderRepostitory();
        $orders= $staffOrderRepostitory->deliveryBoyEarning($data,$staffId);
        $totalEarnings = $staffOrderRepostitory->totalEarning($staffId);

        $data = new DataService();
        if($orders){
            $data->error = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->TotalEarnings = (string) $totalEarnings;
            $data->orders = $orders;

        }else{
            $data->error = Common::error_true;
            $data->errorMessage = __('validation.failure');
            $data->orders = (object)array();
        }
        return $data;
    }

    public function earningDetails($data)
     {

        $staffId = Auth::guard('deliveryboy')->user()->id;
        $staffOrderRepostitory  = new StaffOrderRepostitory();
        $orders= $staffOrderRepostitory->orderEarningDetails($data->orderId);
        $data = new DataService();
        if($orders){
            $data->error = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->orders = $orders;     
            $seconds_diff = strtotime($orders->deliveredTime) - strtotime($orders->assignedTime);                            
            $time = floor($seconds_diff/60);
            $orders->firstMile = $orders->firstMile. ' '. 'Km';
            $orders->lastMile  = floor($orders->lastMile). ' '. 'Km'; 
            $orders->totalTime = $time . ' '.'mins';
            $orders->message   = 'food order from'. ' '. $orders->outletName;
            if ($orders->outletReachedTime == NULL) {
            $orders->outletReachedTime = '2020-02-21 04:00:13';
            } 
             if ($orders->destinationReachedTime == NULL) {
            $orders->destinationReachedTime = '2020-02-21 04:00:13';
            }


        }else{
            $data->error = Common::error_true;
            $data->errorMessage = __('validation.failure');
            $data->orders = (object)array();
        }
        return $data;
    }

  public function reachOutlet($orderData){
    $staffId = Auth::guard('deliveryboy')->user()->id;
    $staffOrderRepostitory  = new StaffOrderRepostitory();
    $orders= $staffOrderRepostitory->reachOutlet($orderData,$staffId);
    $data = new DataService();
    if($orders){
        $data->error = Common::error_false;
        $data->errorMessage = __('validation.sucess');
        // $data->orders = $orders;

            $order=$staffOrderRepostitory->getOrder($orderData->orderId,$staffId);
            $userRepostitory = new UserRepository();
            $user =$userRepostitory->getUser($order['userId']);


            //notification
            $title              =__('validation.pickedupOrder');
            $notificationData   = array();
            $notificationData['message']     = __('validation.reachOutlet');
            $notificationData['os']          = $user['os'];
            $notificationData['body']        = 'pickedup';
            $notificationData['deviceToken'] = $user['deviceToken'];
            $notificationData['orderId']     = $orderData->orderId;


            $pushNotification = new FCMPushNotificationServiceProvider();
            $pushNotification->setTitle($title);
            $data->status =$pushNotification->sendPushNotification($notificationData);


    }else{
        $data->error = Common::error_true;
        $data->errorMessage = __('validation.failure');
    }
    return $data;
}

  public function reachUserLocation($orderData){

    $staffId = Auth::guard('deliveryboy')->user()->id;
    $staffOrderRepostitory  = new StaffOrderRepostitory();
    $orders= $staffOrderRepostitory->reachUserLocation($orderData,$staffId);
    $data = new DataService();
    if($orders){
        $data->error = Common::error_false;
        $data->errorMessage = __('validation.sucess');
        // $data->orders = $orders;

            $order=$staffOrderRepostitory->getOrder($orderData->orderId,$staffId);
            $userRepostitory = new UserRepository();
            $user =$userRepostitory->getUser($order['userId']);


            //notification
            $title              =__('validation.pickedupOrder');
            $notificationData   = array();
            $notificationData['message']     = __('validation.reachUserLocation');
            $notificationData['os']          = $user['os'];
            $notificationData['body']        = 'pickedup';
            $notificationData['deviceToken'] = $user['deviceToken'];
            $notificationData['orderId']     = $orderData->orderId;


            $pushNotification = new FCMPushNotificationServiceProvider();
            $pushNotification->setTitle($title);
            $data->status =$pushNotification->sendPushNotification($notificationData);



    }else{
        $data->error = Common::error_true;
        $data->errorMessage = __('validation.failure');
    }
    return $data;
}   

}

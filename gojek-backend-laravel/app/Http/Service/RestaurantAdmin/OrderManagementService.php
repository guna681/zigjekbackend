<?php


namespace App\Http\Service\RestaurantAdmin;


use App\Address;
use App\Dishes;
use App\Http\Repository\CurrencyRepostitory;
use App\Http\Repository\DishRepostitory;
use App\Http\Repository\IntegrationSettingRepository;
use App\Http\Repository\DashboardRepostitory;
use App\Http\Repository\OrderManagementRepostitory;
use App\Http\Repository\OrderRepostitory;
use App\Http\Repository\CartRepostitory;	
use App\Http\Repository\OutletsRepostitory;	
use App\Http\Repository\StaffOrderRepostitory;	
use App\Http\Repository\UserRepository;	
use App\Http\Libraries\ServiceProviders\FCMPushNotificationServiceProvider;
use App\Http\Service\CartService;
use App\Http\Service\DataService;
use App\Http\Utility\Common;
use App\Orders;
use Illuminate\Support\Facades\Auth;

Class OrderManagementService
{


    public function listPreviousOrders($pageNumber)
    {

        $outletId = Auth::guard('restaurant')->user()->id;
        $orderManagementRepostitory = new OrderManagementRepostitory();
        $orders    = $orderManagementRepostitory->listPreviousOrders($pageNumber,$outletId);
        $data  = new DataService();
        if($orders){
            $data->error = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->listPreviousOrders = $orders->flatten();
            $data->totalPage = $orders->lastPage();
        }else{
            $data->error = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }
        return $data;
    }


    public function listOngoingOrders($pageNumber)
    {
        $outletId = Auth::guard('restaurant')->user()->id;
        $orderManagementRepostitory = new OrderManagementRepostitory();
        $orders = $orderManagementRepostitory->listOngoingOrders($pageNumber,$outletId);
        $data = new DataService();
        if($orders){
            $data->error = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->listPreviousOrders = $orders->flatten();
            $data->totalPage = $orders->lastPage();
        }else{
            $data->error = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }
       return $data;
    }

	
    public function listPastOrders($pageNumber)	
    {	
        $outletId = Auth::guard('restaurant')->user()->id;	
        $orderManagementRepostitory = new OrderManagementRepostitory();	
        $currencyRepostitory = new CurrencyRepostitory();	
        $currency = $currencyRepostitory->getCurrency();	
        $orders = $orderManagementRepostitory->listPastOrders($pageNumber,$outletId);	
        foreach ($orders as $Item) {	
            $stamp = strtotime($Item->orderPlaceTime); // get unix timestamp	
            $orderPlaceTime = $stamp*1000;	
            $Item->netAmount = $currency.number_format($Item->netAmount,2);	
            $Item->orderPlaceTime = $orderPlaceTime;	
            $Item->orderReferenceId = substr($Item->orderReferenceId, 5);	
        }	
        $data = new DataService();	
        if($orders){	
            $data->error = Common::error_false;	
            $data->errorMessage = __('validation.sucess');	
            $data->listPreviousOrders = $orders->flatten();	
            $data->totalPage = $orders->lastPage();	
        }else{	
            $data->error = Common::error_true;	
            $data->errorMessage = __('validation.failure');	
        }	
       return $data;	
    }	
    public function listCurrentOrders($pageNumber)	
    {	
        $outletId = Auth::guard('restaurant')->user()->id;	
        $outletsRepostitory = new OutletsRepostitory();	
        $currencyRepostitory = new CurrencyRepostitory();	
        $currency = $currencyRepostitory->getCurrency();	
        $orderManagementRepostitory = new OrderManagementRepostitory();	
        $orders = $orderManagementRepostitory->listCurrentOrders($pageNumber,$outletId);	
        foreach ($orders as $Item) {	
            $stamp = strtotime($Item->orderPlaceTime); // get unix timestamp	
            $orderPlaceTime = $stamp*1000;	
            $Item->netAmount = $currency.number_format($Item->netAmount,2);	
            $Item->orderPlaceTime = $orderPlaceTime;	
            $Item->orderReferenceId = substr($Item->orderReferenceId, 5);	
        }	
        $data = new DataService();	
        if($orders){	
            $data->error = Common::error_false;	
            $data->errorMessage = __('validation.sucess');	
            $data->listPreviousOrders = $orders->flatten();	
            $data->totalPage = $orders->lastPage();	
        }else{	
            $data->error = Common::error_false;	
            $data->errorMessage = __('validation.failure');	
            $data->listPreviousOrders = [];	
        }	
       return $data;	
    }	
  public function trackOrders($orderId)	
    {	
        // $userId = Auth::guard('api')->user()->id;	
        $outletId = Auth::guard('restaurant')->user()->id;	
        $orderRepostitory = new OrderRepostitory();	
        $order = $orderRepostitory->restaurantTrackOrders($orderId);	
        $data = new DataService();	
print_r($order);	
die;	
        if ($order) {	
            $currencyRepostitory = new CurrencyRepostitory();	
            $currency = $currencyRepostitory->getCurrency();	
            $orders = new Orders();	
            $orders->orderId            = $order->id;	
            $orders->displayOrderId     = $order->orderReferenceId;	
            $orders->orderItems         = $order->itemCount;	
            $orders->netAmount          = $currency.number_format($order->netAmount,2);	
            $orders->userLatitude       = $order->userLatitude;	
            $orders->userLongitude      = $order->userLongitude;	
            $orders->deliveryStaffLatitude    = $order->deliveryStaffLatitude;	
            $orders->deliveryStaffLongitude   = $order->deliveryStaffLongitude;	
            $orders->outletlatitude     = $order->outletlatitude;	
            $orders->outletLongitude    = $order->outletLongitude;	
            $orders->orderReceived      = true;	
            $orders->orderRejected         = ($order->orderStatus == 'rejected')? true:false;	
            // $orders->status             = $order->orderStatus;	
            $orders->receivedTime       = date('h:i:s A', strtotime($order->created_at));	
            $orders->orderConfirmedTime = date('h:i:s A', strtotime($order->confirmedTime));	
            $orders->orderPickedUp      = (is_null($order->pickedupTime)) ? false : true;	
            $orders->orderPickedupTime  = date('h:i:s A', strtotime($order->pickedupTime));	
            $orders->eta                = $order->eta;	
            if ($order->orderStatus == 'accepted'  ) {	
            $orders->deliveryboyAcceptedOrder = true;	
            $orders->orderConfirmed = true;	
            } else {	
            $orders->deliveryboyAcceptedOrder = false;	
            $orders->orderConfirmed     = (is_null($order->confirmedTime)) ? false : true;  	
            }	
            if ($order->orderStatus == 'delivered') {	
              $orders->deliveredStatus = true;	
            } else {	
                $orders->deliveredStatus = false;	
            }	
            if ($order->orderPickedUp == true) {	
            $orders->orderConfirmed = true;	
            } 	
            if ($order->orderStatus == 'reachOutlet') {	
              $orders->reachOutlet = true;	
            } else {	
                $orders->reachOutlet = false;	
            }	
            if ($order->orderStatus == 'reachUserLocation') {	
              $orders->reachUserLocation = true;	
            } else {	
                $orders->reachUserLocation = false;	
            }	
            switch ($order->orderStatus)	
            {	
                case 'assigned' :	
                   $orders->restaurantConfirmedDescription =(is_null($order->confirmedTime))? __('validation.unconfirmAssigned'): __('validation.confirmAssigned');	
                   break;	
                case 'unassigned':	
                    $orders->restaurantConfirmedDescription =(is_null($order->confirmedTime))?__('validation.unconfirmUnassigned') : __('validation.confirmUnassigned');	
                    break;	
                case 'accepted':	
                    $orders->restaurantConfirmedDescription  =__('validation.defaultOrderStatusDescription');	
                    break;    	
                default :	
                    $orders->restaurantConfirmedDescription  =__('validation.reachOutlet');	
            }	
            $data->error            = Common::error_false;	
            $data->errorMessage     = __('validation.sucess');	
            $data->ordersDetails    = $orders;	
        } else {	
            $data->error        = Common::error_true;	
            $data->errorMessage = __('validation.failure');	
        }	
        return $data;	
    }


    public function listOrders($pageNumber)
    {
        $outletId = Auth::guard('restaurant')->user()->id;
        $orderManagementRepostitory = new OrderManagementRepostitory();
        $orders     = $orderManagementRepostitory->listOrders($pageNumber,$outletId);
        $data       = new DataService();
        if ($orders) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->listOrders   = $orders->flatten();
            $data->totalPage    = $orders->lastPage();
        } else {

            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');

        }
        return $data;
    }


    public function getOrders($arg)
    {
        $orderManagementRepostitory = new OrderManagementRepostitory();
         if ($arg->outletId) {
        $orders  = $orderManagementRepostitory->getOrder($arg->orderId, $arg->outletId); 
    }  else {
         $outletId   = Auth::guard('restaurant')->user()->id;
        $orders  = $orderManagementRepostitory->getOrder($arg->orderId, $outletId); 
    }

        $data    = new DataService();
        if ($orders) {


            $ordersData         = new Orders();
            $ordersData->orderId          = $orders->Id;
            $ordersData->orderReferenceId = $orders->orderReferenceId;
            $ordersData->netAmount        = $orders->netAmount;
            $ordersData->orderStatus      = $orders->orderStatus;
            $ordersData->acceptedTime     = $orders->acceptedTime;
            $ordersData->rejectedTime     = $orders->rejectedTime;
            $ordersData->pickedupTime     = $orders->pickedupTime;
            $ordersData->confirmedTime    = $orders->confirmedTime;
            $ordersData->deliveredTime    = $orders->deliveredTime;
            $ordersData->userId           = $orders->UserId;
            $ordersData->userName         = $orders->FirstName;
            $ordersData->userMobileNumber = $orders->Mobile;
            $ordersData->userEmail        = $orders->Email;
            $ordersData->deliveryAddress  = $orders->ToLocation;
            $ordersData->deliveryAddressType = 'Default';

            $ordersData->staffName         = $orders->staffName;
            $ordersData->staffMobileNumber = $orders->staffMobileNumber;
            $ordersData->staffeEmail       = $orders->staffeEmail;
            $ordersData->tripStatus        = $orders->tripStatus;
            $ordersData->orderSuggestions  = $orders->orderSuggestions;
            $ordersData->dishes            = $this->getOrderDishes($orders->Id);

            $cartService    = new CartService();
            $totalcharges[] = $cartService->getItemTotal($ordersData['dishes']);
            $totalcharges[] = $cartService->getCharges($orders['outletId'],$ordersData['dishes']);
            $totalcharges[] = $cartService->getTaxes();
            $totalcharges[] = $this->getTotals($totalcharges);

            $ordersData->billTotals = array_collapse($totalcharges);

            $paymentGateway             = new IntegrationSettingRepository();
            $ordersData->paymentDetails = $paymentGateway->getPaymentGatewayDetails($orders->PaymentTypeId);

            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->orders       = $ordersData;


        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }

    public function getRestaurantOrders($arg)
    {
        $orderManagementRepostitory = new OrderManagementRepostitory();
         if ($arg->outletId) {
        $orders  = $orderManagementRepostitory->getOrder($arg->orderId, $arg->outletId); 
    }  else {
         $outletId   = Auth::guard('restaurant')->user()->id;
        $orders  = $orderManagementRepostitory->getOrder($arg->orderId, $outletId); 
    }

        $data    = new DataService();
        if ($orders) {

        $currencyRepostitory = new CurrencyRepostitory();
        $currency            = $currencyRepostitory->getCurrency();
            $ordersData         = new Orders();
            $ordersData->orderId          = $orders->Id;
            // $ordersData->orderReferenceId = $orders->orderReferenceId;
            $ordersData->netAmount        = $currency.$orders->netAmount;
            $ordersData->orderStatus      = $orders->orderStatus;
            $ordersData->acceptedTime     = $orders->acceptedTime;
            $ordersData->rejectedTime     = $orders->rejectedTime;
            $ordersData->pickedupTime     = $orders->pickedupTime;
            $ordersData->confirmedTime    = $orders->confirmedTime;
            $ordersData->deliveredTime    = $orders->deliveredTime;
            $ordersData->userId           = $orders->userId;
            $ordersData->userName         = $orders->userName;
            $ordersData->userMobileNumber = $orders->mobileNumber;
            $ordersData->userEmail        = $orders->email;
            $ordersData->deliveryAddress  = $orders->deliveryAddress;
            $ordersData->deliveryAddressType = $orders->deliveryAddressType;

            $ordersData->staffName         = $orders->staffName;
            $ordersData->staffMobileNumber = $orders->staffMobileNumber;
            $ordersData->staffeEmail       = $orders->staffeEmail;
            $ordersData->tripStatus        = $orders->tripStatus;
            $ordersData->orderSuggestions  = $orders->orderSuggestions;
            $ordersData->markReady  = $orders->markReady;
            if ($orders->confirmedTime == NULL) {
            $ordersData->isConfirmed  = 0;
            } else {
            $ordersData->isConfirmed  = 1;
            }


             $stamp = strtotime($orders->created_at); // get unix timestamp
            $orderPlaceTime = $stamp*1000;
            $ordersData->orderPlaceTime = $orderPlaceTime;
            $ordersData->orderReferenceId = substr($orders->orderReferenceId, 5);
            $ordersData->dishes            = $this->getRestaurantOrdersDishes($orders->Id);

            $cartService    = new CartService();
            $totalcharges[] = $cartService->getItemTotal($ordersData['dishes']);
            $totalcharges[] = $cartService->getCharges($orders['outletId'],$ordersData['dishes']);
            $totalcharges[] = $cartService->getTaxes();
            $totalcharges[] = $this->getTotals($totalcharges);

            $ordersData->billTotals = array_collapse($totalcharges);

            $paymentGateway             = new IntegrationSettingRepository();
            $ordersData->paymentDetails = $paymentGateway->getPaymentGatewayDetails($orders->PaymentMode);

            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->orders       = $ordersData;


        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }

    public function getOrderDishes($orderId)
    {

        $orderRepostitory    = new OrderRepostitory();
        // $carts               = $orderRepostitory->getCartDetails($orderId);
        $dishRepostitory     = new DishRepostitory();
        $currencyRepostitory = new CurrencyRepostitory();
        $currency            = $currencyRepostitory->getCurrency();
        $orderDish           = array();
        $carts      = $orderRepostitory->orderDish($orderId);
        foreach ($carts as $cart) {

            $dishes = new Dishes();
            $dishes->dishId     = $cart->dishId;
            $dishes->dishName   = $cart->dishName;
            $dishes->quantity   = $cart->quantity;
            $dishes->price      = $currency . $cart->price;
            $dishes->isVeg      = $cart->isVeg;
            // $customisation       = array_flatten(json_decode($cart->customisationId));
            // $cartCustomisationId = array_pluck($customisation, 'dishCustomisationId');
            // $customisationItem   = $orderRepostitory->orderCustomisationItems($cartCustomisationId);

            $orderCustomisationItems = $orderRepostitory->orderCustomisationItems($cart['id']);
            if (empty($orderCustomisationItems)) {
            $dishes->customisationItems = [];
            $dishes->dishTotal = $cart->price * $cart->quantity;
            $dishes->originalDishTotal         = $cart->price * $cart->quantity;
            } else {
            $category                   = $orderRepostitory->orderCustomisationCategory($cart->dishId);               
            $dishes->customisationItems = $this->dishCustomisationTransform($category, $orderCustomisationItems);
             $customisationTotal = $orderCustomisationItems->reduce(function ($carry, $item) {
                        return $carry + $item->price;
                    });

                    $dishes->dishTotal = ($cart->price + $customisationTotal) * $cart->quantity;
             }
            $dishes->displayDishTotal   = $currency . $dishes->dishTotal;
            $dishes->originalDishTotal         = $dishes->dishTotal;
            array_push($orderDish, $dishes);
        }


        return $orderDish;

    }

    public function getRestaurantOrdersDishes($orderId)
    {

        $orderRepostitory    = new OrderRepostitory();
        // $carts               = $orderRepostitory->getCartDetails($orderId);
        $dishRepostitory     = new DishRepostitory();
        $currencyRepostitory = new CurrencyRepostitory();
        $currency            = $currencyRepostitory->getCurrency();
        $orderDish           = array();
        $carts      = $orderRepostitory->orderDish($orderId);
        foreach ($carts as $cart) {

            $dishes = new Dishes();
            $dishes->dishId     = $cart->dishId;
            $dishes->dishName   = $cart->dishName;
            $dishes->quantity   = $cart->quantity;
            $dishes->price      = $currency . $cart->price;
            $dishes->isVeg      = $cart->isVeg;
            // $customisation       = array_flatten(json_decode($cart->customisationId));
            // $cartCustomisationId = array_pluck($customisation, 'dishCustomisationId');
            // $customisationItem   = $orderRepostitory->orderCustomisationItems($cartCustomisationId);

            $orderCustomisationItems = $orderRepostitory->orderCustomisationItems($cart['id']);
            if (empty($orderCustomisationItems)) {
            $dishes->customisationItems = [];
            $dishes->dishTotal = $cart->price * $cart->quantity;

            } else {
            $category                   = $orderRepostitory->orderCustomisationCategory($cart->dishId);               
            $itemData = $this->dishCustomisationTransform($category, $orderCustomisationItems);
            // print_r($itemData);
            // die;
            if (!empty($itemData[0])) {
             $dishes->customisationItems = $itemData[0]->customizableDishItems;
             $customisationTotal = $orderCustomisationItems->reduce(function ($carry, $item) {
                        return $carry + $item->price;
                    });
            } else {
             $dishes->customisationItems = [];
             $customisationTotal = 0; 
            }
             

                    $dishes->dishTotal = ($cart->price + $customisationTotal) * $cart->quantity;
             }
            $dishes->displayDishTotal   = $currency . $dishes->dishTotal;
            array_push($orderDish, $dishes);
        }


        return $orderDish;

    }



    public function dishCustomisationTransform($category,$customisationItem){

        $data=$category->map(function($category) use($customisationItem) {

            $item=$customisationItem->filter(function($items) use($category){

                return $items->customisationCategoryId == $category->customisationCategoryId;
            });
            $customisationCategories  =new \stdClass();
            $customisationCategories->customizableName     =$category->customisationName;
            $customisationCategories->customizableDishItems=$customisationItem;	
            // $customisationCategories->displayPrice         =$customisationItem[0]->price;
            return $customisationCategories;
        });

        return $data;

    }



    public function updateOrderStatus($arg)
    {

        $outletId   = Auth::guard('restaurant')->user()->id;
        $orderManagementRepostitory  = new OrderManagementRepostitory();
        $update     = $orderManagementRepostitory->update_OrderStatus($arg,$outletId);
        $data       = new DataService();
        if ($update) {
            $staffOrderRepostitory = new StaffOrderRepostitory();
            $userRepostitory = new UserRepository();
            $order=$staffOrderRepostitory->getOrderUsingId($arg->orderId);
            $userRepostitory = new UserRepository();
            $user =$userRepostitory->getUser($order['userId']);
            $title              = $order->orderReferenceId;
            $notificationData   = array();
            $notificationData['os']          = $user['os']; 
            $notificationData['orderReferenceId']          = $order->orderReferenceId;
            if ($arg->orderStatus != 1) {
            $notificationData['message']     = 'Order cancelled by restaurant';
            $notificationData['body']        = 'restaurant_rejected';
            }  else {
            $notificationData['message']     = 'Order confirm by restaurant';
            $notificationData['body']        = 'restaurant_confirm';
            }                                       
            $notificationData['deviceToken'] = $user['deviceToken'];
            $notificationData['orderId'] = $arg->orderId;

            $pushNotification = new FCMPushNotificationServiceProvider();
            $pushNotification->setTitle($title);
            $data->status =$pushNotification->sendPushNotification($notificationData);
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {

            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');

        }
        return $data;
    }


    public function getTotals($charges)
    {
        $charge = array_flatten($charges);
        $currencyRepostitory   = new CurrencyRepostitory();
        $currency              = $currencyRepostitory->getCurrency();

        $topay=array_reduce($charge, function($carry, $item) {
            $carry += $item->percentage;
            return $carry;
        });

        $total = new \stdClass();
        $total->displayKey  =  __('validation.grandTotal');
        $total->displayValue= $currency .number_format($topay,2);
        $total->netAmount   = number_format($topay,2);
        return array($total);

    }


    public function listAdminOrders($pageNumber)
    {
        $orderManagementRepostitory = new OrderManagementRepostitory();
        $orders     = $orderManagementRepostitory->listAdminOrders($pageNumber);
        $data       = new DataService();
        if ($orders) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->listOrders   = $orders->flatten();
            $data->totalPage    = $orders->lastPage();
        } else {

            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');

        }
        return $data;
    }




    public function getAdminOrders($arg)
    {

        $orderManagementRepostitory = new OrderManagementRepostitory();
        $orders  = $orderManagementRepostitory->getAdminOrders($arg->orderId);
        $data    = new DataService();
        if ($orders) {


            $ordersData         = new Orders();
            $ordersData->orderId          = $orders->id;
            $ordersData->orderReferenceId = $orders->orderReferenceId;
            $ordersData->netAmount        = $orders->netAmount;
            $ordersData->orderStatus      = $orders->orderStatus;
            $ordersData->acceptedTime     = $orders->acceptedTime;
            $ordersData->rejectedTime     = $orders->rejectedTime;
            $ordersData->pickedupTime     = $orders->pickedupTime;
            $ordersData->confirmedTime    = $orders->confirmedTime;
            $ordersData->deliveredTime    = $orders->deliveredTime;
            $ordersData->userId           = $orders->userId;
            $ordersData->userName         = $orders->userName;
            $ordersData->userMobileNumber = $orders->mobileNumber;
            $ordersData->userEmail        = $orders->email;
            $ordersData->deliveryAddress  = $orders->deliveryAddress;
            $ordersData->deliveryAddressType = $orders->deliveryAddressType;

            $ordersData->staffName         = $orders->staffName;
            $ordersData->staffMobileNumber = $orders->staffMobileNumber;
            $ordersData->staffeEmail       = $orders->staffeEmail;
            $ordersData->tripStatus        = $orders->tripStatus;
            $ordersData->dishes            = $this->getOrderDishes($orders->id);


            $cartService    = new CartService();
            $totalcharges[] = $cartService->getItemTotal($ordersData->dishes);
            $totalcharges[] = $cartService->getCharges($orders->outletId);
            $totalcharges[] = $cartService->getTaxes();
            $totalcharges[] = $this->getTotals($totalcharges);

            $ordersData->billTotals = array_collapse($totalcharges);

            $paymentGateway             = new IntegrationSettingRepository();
            $ordersData->paymentDetails = $paymentGateway->getPaymentGatewayDetails($orders->PaymentTypeId);

            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->orders       = $ordersData;


        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }




    public function AdminOrderStatus($arg)
    {
        $orderManagementRepostitory  = new OrderManagementRepostitory();
        $update     = $orderManagementRepostitory->AdminOrderStatus($arg);
        $data       = new DataService();
        if ($update) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {

            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');

        }
        return $data;
    }

        public function adminListOrdersPopup()
    {
        $orderres = array();
        $outletId   = Auth::guard('restaurant')->user()->id;
        $orderManagementRepostitory = new OrderManagementRepostitory();

        $orders  = $orderManagementRepostitory->getOrderListPopup($outletId);
        $data    = new DataService();
        if (count($orders) > 0) {


            foreach ($orders as $ord => $value) {
            $ordersData         = new Orders();                
            $ordersData->orderId          = $value->id;
            $ordersData->orderReferenceId = $value->orderReferenceId;
            $ordersData->netAmount        = $value->netAmount;
            $ordersData->orderStatus = $value->orderStatus;
            $ordersData->assignedTime = $value->assignedTime;
            $ordersData->confirmedTime = $value->confirmedTime;

            array_push($orderres, $ordersData);
            }            


            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->orders       = $orderres;


        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.noorders');
        }

        return $data;

    }
    public function updateOrderViewStatus()
    {

        $outletId   = Auth::guard('restaurant')->user()->id;
        $orderManagementRepostitory  = new OrderManagementRepostitory();
        $update     = $orderManagementRepostitory->updateOrderViewStatus($outletId);
        $data       = new DataService();
        if ($update) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {

            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');

        }
        return $data;
    }
    public function markReady($arg)
    {

        $orderManagementRepostitory  = new OrderManagementRepostitory();
        $update     = $orderManagementRepostitory->markReady($arg);
        $data       = new DataService();
        if ($update) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {

            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');

        }
        return $data;
    }

    public function dishesEnableDisable($arg)
    {

        $orderManagementRepostitory  = new OrderManagementRepostitory();
        $update     = $orderManagementRepostitory->dishesEnableDisable($arg);
        $data       = new DataService();
        if ($update) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {

            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');

        }
        return $data;
    }

    public function homePage($arg)
    {
        $outletId   = Auth::guard('restaurant')->user()->id;
        $outletsRepostitory = new OutletsRepostitory();
        $currency         = new CurrencyRepostitory();
        $currencySymbol   = $currency->getCurrency();
        $dashboardRepostitory = new DashboardRepostitory();
        $outletDetails = $outletsRepostitory->getOutletDetails($outletId);
        $orderManagementRepostitory  = new OrderManagementRepostitory();
        $data       = new DataService();
        if ($outletDetails) {
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->restaurantName = $outletDetails->name;
            $data->restaurantAddress       = $outletDetails->addressLineOne . ',' . $outletDetails->street . ',' . $outletDetails->area . ',' . $outletDetails->city;
            $data->todayRevenue   = $orderManagementRepostitory->todayRevenue($outletId,$currencySymbol);
            $data->weekSoFar   = $orderManagementRepostitory->weekSoFar($outletId,$currencySymbol);
            $data->yesterdayRevenue   = $orderManagementRepostitory->yesterdayRevenue($outletId,$currencySymbol);
        } else {

            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');

        }
        return $data;
    }

    public function newOrders($pageNumber,$page_offset)
    {

        $outletId   = Auth::guard('restaurant')->user()->id;
        $orderRepostitory = new OrderRepostitory();
        $orders  = $orderRepostitory->newOrders($outletId);
        $data    = new DataService();
        if (!$orders->isEmpty()) {
            $data->error            = Common::error_false;
            $data->errorMessage     = __('validation.listOrders');
            $data->pastOrders       = array();
            $cartRepostitory        = new CartRepostitory();
            $dishRepostitory        = new DishRepostitory();
            $currencyRepostitory    = new CurrencyRepostitory();
            $outletsRepostitory     = new OutletsRepostitory();
            $currency               = $currencyRepostitory->getCurrency();

            foreach ($orders as $order) {

                $carts      = $orderRepostitory->orderDish($order->Id);
                $orderDish  = array();
                foreach ($carts as $cart) {

                    $dish   = $dishRepostitory->getDishes($cart->dishId);
                    $dishes = new Dishes();
                    $dishes->dishplayDish = $dish->dishName . ' ' . 'X' . $cart->quantity;
                    $dishes->isVeg        = $dish->isVeg;
                    $dishes->quantity     = $cart->quantity;

                    $orderCustomisationItems = $orderRepostitory->orderCustomisationItems($cart['id']);



                                    if (!empty($orderCustomisationItems)) {

                    $customisationTotal = $orderCustomisationItems->reduce(function ($carry, $item) {
                        return $carry + $item->price;
                    });

                    $dishes->dishTotal = ($cart->price + $customisationTotal) * $cart->quantity;
                    $dishes->originalDishTotal = ($cart->price + $customisationTotal) * $cart->quantity;
                    
                } else {

                    $dishes->dishTotal = $cart->price * $cart->quantity;
                    $dishes->originalDishTotal = $cart->price * $cart->quantity;

                }




                    $dishes->displayPrice = $currency . $dishes->dishTotal;

                    array_push($orderDish, $dishes);

                }


                $outlet = $outletsRepostitory->getOutlet($order->outletId);
                $orderDetails = new \stdClass;
                $orderDetails->outletName       = $outlet->name;
                $orderDetails->outletLocation   = $outlet->area;
                $netAmount                      = number_format($order->netAmount, 2);
                $orderDetails->displayNetAmount = $currency . $netAmount;
                $orderDetails->isdelivered      = isset($order->deliveredTime) ? "true": "false";
                $orderDetails->buttonName       = isset($order->deliveredTime)  ? __('validation.reorder'): __('validation.trackOrder');
                // $orderDetails->displaydate      = date('F j, g:i a', strtotime($order->created_at));
                $stamp                             = strtotime($order->created_at); // get unix timestamp
                $orderPlaceTime                    = $stamp*1000;
                $orderDetails->displaydate      = $orderPlaceTime;
                $orderDetails->displayDish      = implode(', ', array_column($orderDish, 'dishplayDish'));
                $orderDetails->orderId          = $order->Id;
                
                $orderData = new \stdClass();
                $orderData->displayOrderId      = $order->orderReferenceId;
                $orderData->displayTotalItems   = count($orderDish) . ' items';
                $orderData->displayNetAmount    = $currency . $order->netAmount;
                $orderData->outletId            = $outlet->id;
                $orderData->outletName          = $outlet->name;
                $orderData->outletAddress       = $outlet->addressLineOne . ',' . $outlet->street . ',' . $outlet->area . ',' . $outlet->city;

                $orderData->userAddressType  = $order->deliveryAddressType;
                $orderData->userAddress      = $order->deliveryAddress;
                $orderData->isdelivered      = (is_null($order->deliveredTime)) ? "false" : "true";
                if ($order->orderStatus == 'rejected') {
                $orderDetails->buttonName       = __('validation.cancelled');

                } else {
                $orderDetails->buttonName       = isset($order->deliveredTime)  ? __('validation.reorder'): __('validation.trackOrder');
                }
                $orderData->deliveriedByAndTime = "Order Delivered on " . date('F j, g:i a',
                        strtotime($order->updated_at));
                /** charges calculation  for orders */

                $orderData->paymentMethod = ($order->PaymentTypeId == '10') ? __('validation.payedCash')  : __('validation.payedCard');

                $orderData->dishes      = $orderDish;
                $orderData->charges     = $this->getCharges($outlet->id, array_flatten($orderDish), $order->couponName,$orderData->paymentMethod,$order->discount);
                $orderDetails->orderDetails = $orderData;
                array_push($data->pastOrders, $orderDetails);
                
            }
             $data->totalPage        = ceil(count($data->pastOrders)/15);
            $data->pastOrders = array_slice( $data->pastOrders, $page_offset , 15 );
        } else {

            $data->error = Common::error_false;
            $data->pastOrders = [];
            $data->errorMessage = __('validation.noOrders');

        }        
        return $data;

    }

  /* total Calculation */
    public function getCharges($outletId, $dishes, $couponName,$paymentMethod,$orderdiscount)
    {
        $cartService = new CartService();
        $totalcharges[] = $cartService->getItemTotal($dishes);
        $totalcharges[] = $cartService->getCharges($outletId, $dishes);
        $totalcharges[] = $cartService->getTaxes();
        $totalcharges[] =  $this->slashedPriceDiscount($orderdiscount); 
        $charge = array_flatten($totalcharges);
        
        $currencyRepostitory = new CurrencyRepostitory();
        $currency = $currencyRepostitory->getCurrency();
        $topay = array_reduce($charge, function ($carry, $item) {
            $carry += $item->percentage;
            return $carry;
        });

        $total = (object)array();
        $total->displayKey = $paymentMethod;
        $total->displayValue = $currency . number_format($topay, 2);
        $totalcharges[] = array($total);
        $data = array_collapse($totalcharges);
        return $data;

    }

    public function slashedPriceDiscount($orderdiscount){
    
        $currencyRepostitory   = new CurrencyRepostitory();
        $currency              = $currencyRepostitory->getCurrency();
        $total = new \stdClass();
        if ($orderdiscount != 0) {
        $total->displayKey  =  'Total Discount';
        $total->displayValue= $currency .number_format($orderdiscount,2);
        $total->netAmount   = (string)floatval($orderdiscount);
        $total->percentage  = '-'. (string)floatval($orderdiscount);
        } else {
        $total->displayKey  =  'Total Discount';
        $total->displayValue= $currency .number_format($orderdiscount,2);
        $total->netAmount   = (string)floatval($orderdiscount);
        $total->percentage  = '-'. (string)floatval($orderdiscount); 
        }
        return array($total);

    }

 public function moveElement(&$totalcharges, $a, $b) {
            $out = array_splice($totalcharges, $a, 1);
            array_splice($totalcharges, $b, 0, $out);
        }

 public function newCurrentOrders($pageNumber,$page_offset)
    {

        $outletId   = Auth::guard('restaurant')->user()->id;
        $orderRepostitory = new OrderRepostitory();
        $orders  = $orderRepostitory->newCurrentOrders($outletId);
        $data    = new DataService();
        if (!$orders->isEmpty()) {
            $data->error            = Common::error_false;
            $data->errorMessage     = __('validation.listOrders');
            $data->listPreviousOrders       = array();
            $cartRepostitory        = new CartRepostitory();
            $dishRepostitory        = new DishRepostitory();
            $currencyRepostitory    = new CurrencyRepostitory();
            $outletsRepostitory     = new OutletsRepostitory();
            $currency               = $currencyRepostitory->getCurrency();

            foreach ($orders as $order) {

                $carts      = $orderRepostitory->orderDish($order->Id);
                $orderDish  = array();
                foreach ($carts as $cart) {

                    $dish   = $dishRepostitory->getDishes($cart->dishId);
                    $dishes = new Dishes();
                    $dishes->dishplayDish = $dish->dishName . ' ' . 'X' . $cart->quantity;
                    $dishes->isVeg        = $dish->isVeg;
                    $dishes->quantity     = $cart->quantity;
                    
                    $orderCustomisationItems = $orderRepostitory->orderCustomisationItems($cart['id']);



                                    if (!empty($orderCustomisationItems)) {

                    $customisationTotal = $orderCustomisationItems->reduce(function ($carry, $item) {
                        return $carry + $item->price;
                    });

                    $dishes->dishTotal = ($cart->price + $customisationTotal) * $cart->quantity;
                    $dishes->originalDishTotal = ($cart->price + $customisationTotal) * $cart->quantity;
                    
                } else {

                    $dishes->dishTotal = $cart->price * $cart->quantity;
                    $dishes->originalDishTotal = $cart->price * $cart->quantity;

                }




                    $dishes->displayPrice = $currency . $dishes->dishTotal;

                    array_push($orderDish, $dishes);

                }


                $outlet = $outletsRepostitory->getOutlet($order->outletId);
                $orderDetails = new \stdClass;
                $orderDetails->outletName          = $outlet->name;
                $orderDetails->deliveryStaffId     = $order->deliveryStaffId;
                $stamp                             = strtotime($order->created_at); // get unix timestamp
                $orderPlaceTime                    = $stamp*1000;
                $orderDetails->orderPlaceTime      = $orderPlaceTime;
                $orderDetails->orderReferenceId    = substr($order->orderReferenceId, 5);
                $orderDetails->outletLocation      = $outlet->area;
                $orderDetails->orderStatus         = $order->orderStatus;
                $orderDetails->confirmedTime       = $order->confirmedTime;
                $orderDetails->markReady           = $order->markReady;
                if ($order->confirmedTime == NULL) {
                    $orderDetails->isConfirmed  = 0;
                    } else {
                    $orderDetails->isConfirmed  = 1;
                    }
                $orderDetails->staffName           = $order->staffName;
                $orderDetails->updated_at          = $order->updated_at;
                $orderDetails->restaurantEta       = $order->restaurantEta;
                $netAmount                         = number_format($order->netAmount, 2);
                $orderDetails->netAmount           = $currency . $netAmount;
                $orderDetails->isdelivered         = isset($order->deliveredTime) ? "true": "false";
                $orderDetails->buttonName          = isset($order->deliveredTime)  ? __('validation.reorder'): __('validation.trackOrder');
                $orderDetails->displaydate         = date('F j, g:i a', strtotime($order->created_at));
                $orderDetails->displayDish         = implode(', ', array_column($orderDish, 'dishplayDish'));
                $orderDetails->orderId             = $order->Id;
                
                $orderData = new \stdClass();
                $orderData->displayOrderId      = $order->orderReferenceId;
                $orderData->displayTotalItems   = count($orderDish) . ' items';
                $orderData->displayNetAmount    = $currency . $order->netAmount;
                $orderData->outletId            = $outlet->id;
                $orderData->outletName          = $outlet->name;
                $orderData->outletAddress       = $outlet->addressLineOne . ',' . $outlet->street . ',' . $outlet->area . ',' . $outlet->city;

                $orderData->userAddressType  = $order->deliveryAddressType;
                $orderData->userAddress      = $order->deliveryAddress;
                $orderData->isdelivered      = (is_null($order->deliveredTime)) ? "false" : "true";
                if ($order->orderStatus == 'rejected') {
                $orderDetails->buttonName       = __('validation.cancelled');

                } else {
                $orderDetails->buttonName       = isset($order->deliveredTime)  ? __('validation.reorder'): __('validation.trackOrder');
                }
                $orderData->deliveriedByAndTime = "Order Delivered on " . date('F j, g:i a',
                        strtotime($order->updated_at));
                /** charges calculation  for orders */

                $orderData->paymentMethod = ($order->PaymentTypeId == '10') ? __('validation.payedCash')  : __('validation.payedCard');

                $orderData->dishes      = $orderDish;
                $orderData->charges     = $this->getCharges($outlet->id, array_flatten($orderDish), $order->couponName,$orderData->paymentMethod,$order->discount);
                $orderDetails->orderDetails = $orderData;
                array_push($data->listPreviousOrders, $orderDetails);
                
            }
             $data->totalPage        = ceil(count($data->listPreviousOrders)/15);
            $data->listPreviousOrders = array_slice( $data->listPreviousOrders, $page_offset , 15 );
        } else {

            $data->error = Common::error_false;
            $data->listPreviousOrders = [];
            $data->errorMessage = __('validation.noOrders');
        }        
        return $data;

    }

}
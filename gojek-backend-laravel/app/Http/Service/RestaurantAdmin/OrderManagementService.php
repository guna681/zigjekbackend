<?php


namespace App\Http\Service\RestaurantAdmin;


use App\Address;
use App\Dishes;
use App\Http\Repository\CurrencyRepostitory;
use App\Http\Repository\DishRepostitory;
use App\Http\Repository\IntegrationSettingRepository;
use App\Http\Repository\OrderManagementRepostitory;
use App\Http\Repository\OrderRepostitory;
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
            $ordersData->paymentDetails = $orders->PaymentMode;

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

            } else {
            $category                   = $orderRepostitory->orderCustomisationCategory($cart->dishId);               
            $dishes->customisationItems = $this->dishCustomisationTransform($category, $orderCustomisationItems);
             $customisationTotal = $orderCustomisationItems->reduce(function ($carry, $item) {
                        return $carry + $item->price;
                    });

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
            $customisationCategories->customizableDishItems=$item->flatten();
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

}
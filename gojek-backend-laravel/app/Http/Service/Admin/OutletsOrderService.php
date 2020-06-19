<?php

namespace  App\Http\Service\Admin;

use App\Http\Repository\OrderManagementRepostitory;
use App\Http\Repository\UserRepository;
use App\Http\Service\RestaurantAdmin\OrderManagementService;
use App\Http\Utility\Common;
use App\Address;
use App\Dishes;
use App\Http\Repository\CurrencyRepostitory;
use App\Http\Repository\DishRepostitory;
use App\Http\Repository\StaffOrderRepostitory;
use App\Http\Repository\IntegrationSettingRepository;
use App\Http\Repository\OrderRepostitory;
use App\Http\Service\CartService;
use App\Http\Service\DataService;
use App\Http\Service\TaxService;
use App\Http\Utility\FCMPushNotification;
use App\Http\Libraries\ServiceProviders\FCMPushNotificationServiceProvider;

use App\Orders;



Class OutletsOrderService
{

    public function listOutletsOrders($pageNumber)
    {
        $orderManagementRepostitory = new OrderManagementRepostitory();
        $orders     = $orderManagementRepostitory->listOutletsOrders($pageNumber);
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

    public function getOutletOrder($arg)
    {

        $orderManagementRepostitory = new OrderManagementRepostitory();
        $orders     = $orderManagementRepostitory->getAdminOrders($arg->orderId);
        
        $data       = new DataService();
        if ($orders) {


            $ordersData             = new Orders();
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
            $ordersData->deliveryAddressType = $orders->deliveryAddressType;

            $ordersData->staffName          = $orders->staffName;
            $ordersData->staffMobileNumber  = $orders->staffMobileNumber;
            $ordersData->staffeEmail        = $orders->staffeEmail;
            $ordersData->tripStatus         = $orders->tripStatus;
            $ordersData->orderSuggestions         = $orders->Description;
            $ordersData->outletEmail = $orders->outletEmail;
            $ordersData->OutletName = $orders->OutletName;
            $ordersData->addressLineOne = $orders->addressLineOne;
            $ordersData->addressLineTwo = $orders->addressLineTwo;
            $ordersData->street = $orders->street;
            $ordersData->area = $orders->area;
            $ordersData->city = $orders->city;
            $ordersData->state = $orders->state;
            $ordersData->mobileNumber = $orders->contactNumber;

            $orderManagementService    = new OrderManagementService();
            $ordersData->dishes        = $orderManagementService->getOrderDishes($orders->Id);


            $cartService = new CartService();
            $totalcharges[] = $cartService->getItemTotal($ordersData->dishes);
            $totalcharges[] = $cartService->getCharges($orders->outletId, $ordersData->dishes);
            $totalcharges[] = $cartService->getTaxes();

            $taxService = new TaxService();
            $totalcharges[] = $taxService->getGrandTotals($totalcharges);

            $ordersData->billTotals = array_collapse($totalcharges);

            $paymentGateway = new IntegrationSettingRepository();
            $ordersData->paymentDetails = $orders->PaymentMode;

            $data->error = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->orders = $ordersData;


        } else {
            $data->error = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }


    public function updateOrderStatus($arg)
    {
        $orderManagementRepostitory  = new OrderManagementRepostitory();
        $staffOrderRepostitory = new StaffOrderRepostitory();
        $update     = $orderManagementRepostitory->update_OrderStatus($arg);
        $data       = new DataService();
        if ($update) {

                         if ($arg->orderStatus != 1) {
            $order=$staffOrderRepostitory->getOrderUsingId($arg->orderId);
            $userRepostitory = new UserRepository();
            $user =$userRepostitory->getUser($order['userId']);

            // $staffOrderRepostitory->updateDeliveryStaffEarnings($staffId, $order['providerEarnings']);

            //notification
            $title              =__('validation.cancelled');
            $notificationData   = array();
            $notificationData['message']     = 'Order cancelled by restaurant'.' '.$order->orderReferenceId;
            $notificationData['os']          = $user['os']; 
            $notificationData['body']        = '';
             // $notificationData['body']        =   [
             //                                            'image'      => "NULL",
             //                                            'title'      => $title,
             //                                            'notification_type'=>'cancelled',
             //                                            'extraKey'   => 'orderId',
             //                                            'extraValue' =>'Null',
             //                                        ];                                           
            $notificationData['deviceToken'] = $user['deviceToken'];
            $notificationData['orderId'] = $arg->orderId;

            $pushNotification = new FCMPushNotificationServiceProvider();
            $pushNotification->setTitle($title);
            $data->status =$pushNotification->sendPushNotification($notificationData);
         } else {

              }
            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
        } else {

            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');

        }
        return $data;

    }


    public function updateOrderViewStatus($arg)
    {
        $orderManagementRepostitory  = new OrderManagementRepostitory();
        $staffOrderRepostitory = new StaffOrderRepostitory();
        $update     = $orderManagementRepostitory->updateOrderViewStatus();
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


    public function getReportsData()
    {

        $orderManagementRepostitory = new OrderManagementRepostitory();
        $data       = new DataService();
        if (true) {

            $ordersData             = new Orders();
            $ordersData->outlets = $orderManagementRepostitory->getOutletsList();
            $ordersData->ordersdate = $orderManagementRepostitory->getOrdersDate();
            $ordersData->provider = $orderManagementRepostitory->getDeliveryStaffs();

            $data->error = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->reports = $ordersData;


        } else {
            $data->error = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }

    public function reportSearchData($arg)
    {
        $data       = new DataService();
        $orderManagementRepostitory  = new OrderManagementRepostitory();
        if (!empty($arg->type)) {
            $sql = "SELECT Orders.*,Users.userName as username,Users.mobileNumber as usermobile,Restaurant.name as restaurantname,Outlets.email as outletemail,Outlets.name as outletname,Outlets.contactNumber as outletnumber,DeliveryStaff.name as deliveryboyname,DeliveryStaff.email as deliveryboyemail,DeliveryStaff.mobileNumber as deliveryboymobile from Orders LEFT JOIN Outlets ON Orders.outletId = Outlets.id LEFT JOIN DeliveryStaff ON Orders.deliveryStaffId = DeliveryStaff.id LEFT JOIN Restaurant ON Restaurant.id = Outlets.restaurantId LEFT JOIN Users ON Users.id = Orders.userId WHERE ";
            switch ($arg->type) {
                case "one":
                    $sql .= "date(Orders.created_at) = '$arg->fromData'";
                    break;
                case "two":
                    $sql .= "Orders.outletId = $arg->outletData";
                    break;
                case "three":
                    $sql .= "Orders.deliveryStaffId = $arg->providerData";
                    break;
                case "four":
                    $sql .= "date(Orders.created_at) <= '$arg->toData'";
                    break;
                case "one&two":
                    $sql .= "date(Orders.created_at) = '$arg->fromData' && Orders.outletId = $arg->outletData";
                    break;
                case "two&three":
                    // $sql .= "Orders.outletId = $arg->outletData && Orders.deliveryStaffId = $arg->providerData && date(Orders.created_at) = '$arg->toData'";
                    $sql .= "Orders.outletId = $arg->outletData && Orders.deliveryStaffId = $arg->providerData";
                    break;
                case "three&four":
                    $sql .= "Orders.deliveryStaffId = $arg->providerData && date(Orders.created_at) <= '$arg->toData'";
                    break;
                case "one&three":
                    $sql .= "date(Orders.created_at) >= '$arg->fromData' && Orders.deliveryStaffId = $arg->providerData";
                    break;
                case "one&four":
                    $sql .= "date(Orders.created_at) >= '$arg->fromData' && date(Orders.created_at) <= '$arg->toData'";                    
                    break;
                case "two&four":
                    $sql .= "Orders.outletId = $arg->outletData && date(Orders.created_at) <= '$arg->toData'";
                    break;
                case "one&two&three":
                    $sql .= "date(Orders.created_at) = '$arg->fromData' && Orders.outletId = $arg->outletData && Orders.deliveryStaffId = $arg->providerData";                                        
                    break;
                case "two&three&four":
                    $sql .= "Orders.outletId = $arg->outletData && Orders.deliveryStaffId = $arg->providerData && date(Orders.created_at) <= '$arg->toData'";                                                           
                    break;
                case "one&three&four":
                    $sql .= "date(Orders.created_at) >= '$arg->fromData' && Orders.deliveryStaffId = $arg->providerData && date(Orders.created_at) <= '$arg->toData'";                                                                               
                    break;
                case "one&two&four":
                    $sql .= "date(Orders.created_at) >= '$arg->fromData' && Orders.outletId = $arg->outletData && date(Orders.created_at) <= '$arg->toData'";                                                            
                    break;
                case "one&two&three&four":
                    $sql .= "date(Orders.created_at) >= '$arg->fromData' && Orders.outletId = $arg->outletData && Orders.deliveryStaffId = $arg->providerData && date(Orders.created_at) <= '$arg->toData'";                                                            
                    break;                                                                                
                default:
                    echo "other type";
            }
            $limit = 10;
            $page = (int)$arg->page ; 
            $offet = ($page - 1) * $limit;
            $sql1 = $sql . " ORDER BY id DESC LIMIT $limit OFFSET $offet";
            $countData = $orderManagementRepostitory->getOrderReportsData($sql);            
            if ($countData) {
                $resultData = $orderManagementRepostitory->getOrderReportsData($sql1);
                $data->error        = Common::error_false;
                $data->errorMessage = __('validation.sucess');
                $data->results = $resultData;
                $data->pageCount = count($countData);
                $data->totalResults = $countData;
            } else {
    
                $data->error        = Common::error_true;
                $data->errorMessage = __('validation.failure');
    
            }  
        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }

        return $data;

    }


}



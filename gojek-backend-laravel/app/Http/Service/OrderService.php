<?php

namespace App\Http\Service;
use App\Http\Repository\UserRepository;
use App\Http\Utility\Constant;
use Illuminate\Http\Request;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Repository\OrderRepostitory;
use App\Http\Repository\CartRepostitory;
use App\Http\Repository\DishRepostitory;
use App\Http\Repository\CurrencyRepostitory;
use App\Http\Repository\OutletsRepostitory;
use App\Http\Repository\AppConfigRepostitory;
use App\User;
use App\Orders;
use App\Dishes;
use Illuminate\Support\Facades\Auth;
use App\Http\Utility\FCMPushNotification;
use App\Http\Cron\S2ServiceProvider;
use App\Http\Libraries\ServiceProviders\FCMPushNotificationServiceProvider;
use App\Http\Service\PaymentService;
Use Log;
Class  OrderService
{


    public function orderConfirm($arg)
    {

        $userRepostitory = new UserRepository();
        $s2ServiceProvider = new S2ServiceProvider();
        $orderRepostitory     = new OrderRepostitory();
        $appConfigRepostitory = new AppConfigRepostitory();
        $userId = Auth::guard('api')->user()->Id;
        // update rate status
        $updateData = 0;
        // $ratings                = $orderRepostitory->updateRatingStatus($updateData,$userId );
        $paymentAddress  = $userRepostitory->getPaymentAddress($arg->deliveryAddressId);
        $appconfigdata = $appConfigRepostitory->getAppConfig();
        $orders               = new Orders();
        $origin = array();
        $destination = array();
        array_push($destination, $paymentAddress->latitude, $paymentAddress->longitude);
        $orders->DestinyLat          = $paymentAddress->latitude;
        $orders->DestinyLong          = $paymentAddress->longitude;
        $orders->userId            = $userId;
        $orders->deliveryAddressId = $arg->deliveryAddressId;
        $orders->outletId          = $arg->outletId;
        $orders->udId              = $arg->udId;
        $orders->netAmount         = $arg->netAmount;
        $orders->discount          = $arg->discount;
        $orders->couponName        = $arg->couponName;
        $orders->paymentType       = $arg->paymentType;
        $orders->orderRefferenceId = "ORDER#" . time(); //orderRefference Id
        $orders->cartId            = json_decode($arg->cartId);//array value
        $orders->deliveryAddress   = $paymentAddress->fullAddress;
        $orders->addressType       = $paymentAddress->type;
        $orders->orderStatus       = Constant::UNASSIGNED;
        $orders->orderSuggestions  = $arg->orderSuggestions;
        $orders->deliverycharge    = $appconfigdata[0]->Value;
        
        $orderId                = $orderRepostitory->addOrder($orders);
        
        $data    = new DataService();
        if ($orderId) {
            $data->error         = Common::error_false;
            // $data->errorMessage  = __('validation.orderSuccess');
            $data->orderId       = $orderId;

            $userRepostitory = new UserRepository();
            $outletsRepostitory     = new OutletsRepostitory();

            $orderDetails= $this->getOrderDetail($orderId, $arg->couponName);
           
            $userDetails = $userRepostitory->getUser($userId);
        
            $stripeCustomerId = $userDetails->StripeCustomerID;
            $orderdata = $orderDetails->orderDetails;
            array_push($origin, $orderdata->latitude, $orderdata->longitude);
            // $distanceData = $s2ServiceProvider->getDistanceCalculation($origin, $destination);

            $outletToRestaurantDistance                   = $this->distanceTo($origin, $destination);

            $totalDistance      =$outletToRestaurantDistance;

            $totalTime = $totalDistance /3;   //30 km/hr 3speed

            $etaInMinutes = $totalTime + $orderdata->preparationTime;

            $roundOfMinutes = round($etaInMinutes,0,PHP_ROUND_HALF_UP);
             $addEtaMinutesToCurrentTime = 'now +'.$roundOfMinutes.' minutes';
             
             $etaInTimestamp = date('Y-m-d H:i:s', strtotime($addEtaMinutesToCurrentTime));
             // $lastMileData = array();
              $lastMileData    = new DataService();
              $lastMileData->orderId = $orderId;
              $lastMileData->outletToRestaurantDistance = $outletToRestaurantDistance;
              $lastMileData->etaInTimestamp = $etaInTimestamp;
              $lastMileData->SourceLat = $orderdata->latitude;
              $lastMileData->SourceLong = $orderdata->longitude;
              $lastMileData->s2CellId   = $orderdata->s2CellId;
              $lastMileData->outletAddress = $orderdata->outletAddress;
              $lastMileData->outletName   = $orderdata->outletName;
              $lastMileData->contactNumber   = $orderdata->contactNumber;
              $lastMileData->serviceCommission   = $orderdata->serviceCommission;
            $updateLastMile                = $orderRepostitory->updateLastMile($lastMileData);
            // if($distanceData->error === false) {     
            //     $updateDate = (object) array();
            //     $appConfigRepostitory = new AppConfigRepostitory();
            //     $appconfigdata = $appConfigRepostitory->getAppConfig();
            //     $distanceResult = $distanceData->result;
            //     $updateDate->orderId = $orderId;
            //     $updateDate->userId = $userId;
            //     $distance = $distanceResult->distance;
            //     $cartRepostitory        = new CartRepostitory();
            //     $outlets                = $cartRepostitory->getOutlet($arg->outletId);
            //     $serviceCommission = $outlets->serviceCommission;

            //     $amount = floatval($orderdata->netAmount) - floatval($appconfigdata[0]->Value);

            //     if ($distance > intval($appconfigdata[3]->Value)) {


            //         $distanceCharges = $distance * floatval($appconfigdata[2]->Value);
            //         $updateDate->distanceCharges = $distanceCharges;

            //         $updateDate->deliverycharge = floatval($appconfigdata[0]->Value) + $distanceCharges; 
            //         $remainingAmount = $amount - $distanceCharges;
            //         $adminCommission = (($remainingAmount * $serviceCommission)/100);
            //         $updateDate->distance = $distance;

            //         $finalOutletAmount = $remainingAmount - $adminCommission;
            //         $updateDate->adminServiceCharge = $adminCommission;
            //         $updateDate->outletEarnings = $finalOutletAmount;
            //         $updateOrder = $orderRepostitory->updateOrderDetail($updateDate);
            //         $outletsRepostitory->updateOutletsEarnings($finalOutletAmount, $arg->outletId);

            //     } else {
            //         $updateDate->distanceCharges = 0.00;
            //         $updateDate->deliverycharge = floatval($appconfigdata[0]->Value); 
            //         $updateDate->distance = $distance;
                    
            //         $adminCommission = (($amount * $serviceCommission)/100);
            //         $finalOutletAmount = $amount - $adminCommission;
            //         $updateDate->adminServiceCharge = $adminCommission;
            //         $updateDate->outletEarnings = $finalOutletAmount;

            //         $updateOrder = $orderRepostitory->updateOrderDetail($updateDate);      
            //         $outletsRepostitory->updateOutletsEarnings($finalOutletAmount, $arg->outletId);
            //     }
                               
            // }            
            $orderDish =$this->getOrderDishInvoice($orderdata->dishes,$orderdata->charges);
            
            $order=array('orderRefferenceId'=>$orderdata->displayOrderId,
                         'netAmount'        =>$orderdata->displayNetAmount,
                         'totalItems'       =>$orderdata->displayTotalItems,
                         'outletName'       =>$orderdata->outletName,
                         'outletAddress'    =>$orderdata->outletAddress,
                         'userName'         =>$userDetails->userName,
                         'userAddress'      =>$orderdata->userAddress,
                         'orderSummary'     =>$orderDish,
                      );
           
            $mailService = new MailService();
            if ($arg->paymentType == '13') {
            $walletUpdate = array();
            $walletUpdate['UserTypeId'] = $userId;
            $walletUpdate['UserType'] = 'user';
            $walletUpdate['Amount'] = $arg->netAmount;
            $walletBalanceUpdate          = $orderRepostitory->debitWallet($walletUpdate);

            }
            if($arg->paymentType == '11'){
            $paymentService = new PaymentService();
            $paymentService->stripeCharge($stripeCustomerId, $arg->token , $orderdata->displayNetAmount , $userDetails->email);

            //notification
            $title              = 'Payment Completed';
            $notificationData   = array();
            $notificationData['message']     =$userDetails['userName'].' '.__('validation.orderSuccess');
            $notificationData['os']          = $userDetails['os'];
            // $notificationData['body']        =   [
            //                                         'image'      => "NULL",
            //                                         'title'      => $title,
            //                                         'notification_type'=> __('validation.orderSuccess'),
            //                                         'extraKey'   => 'orderId',
            //                                         'extraValue' =>$arg->orderId,
            //                                     ];
            $notificationData['body']        =  $userDetails['userName'].' '.__('validation.orderSuccess');
            $notificationData['deviceToken'] = $userDetails['deviceToken'];
            $notificationData['orderId'] = $orderId;

            $pushNotification = new FCMPushNotificationServiceProvider();
            $pushNotification->setTitle($title);
            $notificationResp = $pushNotification->sendPushNotification($notificationData);
                        $data->errorMessage = $notificationResp;

            }
            if ($orderdata->restaurantDeviceToken){
            Log::debug($orderdata->restaurantDeviceToken);
                                   //notification
            $title              = 'New Order';
            $notificationData   = array();
            $notificationData['message']     = 'New Incoming Order';
            $notificationData['os']          = $orderdata->os;
            $notificationData['body']        =  'New Incoming Order';
            $notificationData['notifyType']        =  'new Order';
            $notificationData['deviceToken'] = $orderdata->restaurantDeviceToken;
            $notificationData['orderId'] = $orderId;
            $notificationData['orderReferenceId'] = $orders->orderRefferenceId;
            $pushNotification = new FCMPushNotificationServiceProvider();
            $pushNotification->setTitle($title);
            $notificationResp = $pushNotification->sendPushNotification($notificationData);
            Log::debug($notificationResp);

                        $data->errorMessage = $notificationResp; 
        }
            // $title= __('validation.invoiceTitle');
            // $mailService->setTitle($title);
            // $mailService->setReceiver($userDetails->email);
            // $mailService->setTemplate(Constant::ORDERINVOICE);
            // $mailService->sendMail($order);
         
            // $orderDetails= $this->updateCustomisationItem($orders->cartId);
            

        } else {
            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.orderFailure');
        }
        return $data;

    }

//  public function updateCustomisationItem($cartIds)
//     {
//          foreach ($cartIds as $cartId) {
//             print_r($cartId->cartId);
//     $cartRepostitory    = new CartRepostitory();
// $cartValue               = $cartRepostitory->getCartValue1($cartId);
//    foreach ($cartValue as $order) {
// print_r($order)
//     }
//     }
// print_r($cartValue[0]->customisationId);
// die;

    // }

    public  function distanceTo($current,$outlet) {
        $miles = rad2deg(acos((sin(deg2rad($current[0]))*sin(deg2rad($outlet[0]))) + (cos(deg2rad($current[0]))*cos(deg2rad($outlet[0]))*cos(deg2rad($current[1]-$outlet[1])))));
                         
        $kilometers = $miles * 111.13384;
      return $kilometers;

    }


    public function getOrderDishInvoice($dishes,$charges)
    {
        $mail = '';

        $mail .='<table class="order-tbl third-order" style="border-collapse:collapse;width:100%; border-bottom: 1px solid Chocolate ; 
;">';
        $mail .='<tr style="line-height: 43px;border-top:1px solid Peru; border-bottom: 1px solid Peru ;  ">
                 <th style="padding-left: 9px;color: #000000; text-align: initial">'.__('validation.itemName').'</th>
                 <th style="padding-left: 9px;color: #000000; text-align: initial">'.__('validation.quantity').'</th>
                 <th style="padding-left: 9px;color: #000000; text-align: initial">'.__('validation.unitPrice').'</th>
                 <th style="padding-left: 9px;color: #000000; text-align: initial">'.__('validation.total').'</th>';
        foreach($dishes as $dish){
            $mail .= '<tr style="line-height: 43px; border-bottom: 1px solid Peru ;"> 
                     <td style="text-align: initial; padding-right: 9px;">'.$dish->dishplayDish.'</td>
                     <td style="text-align: initial; padding-right: 9px;">'.$dish->quantity.'</td>
                     <td style="text-align: initial; padding-right: 9px;">'.$dish->dishTotal.'</td>                        
                     <td style="text-align: initial; padding-right: 9px;">'.$dish->displayPrice.'</td>                   
                                        
                     </tr>';
        }


        foreach ($charges as $charge) {

           $mail.='<tr style="line-height: 43px;">
                   <td style="padding-right: 9px;text-align:end;color: #79b33b;"colspan="3"><strong>'.$charge->displayKey.'</strong></td>
                   <td style="padding-right: 9px;text-align:center;">'.$charge->displayValue.'</td>
                   </tr>';

        }

        $mail .='</table>';


        return $mail;
    }


    public function listPastOrders($pageNumber,$page_offset)
    {

        $userId  = Auth::guard('api')->user()->Id;
        $orderRepostitory = new OrderRepostitory();
        $orders  = $orderRepostitory->listPastOrders($userId);
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
                    // if ($cart->['id']) {

                    //     $customisationItem      = $dishRepostitory->getCustomisationItem($cart->dishId);
                    //     $customisation          = array_flatten(json_decode($cart->customisationId));
                    //     $cartCustomisationId    = array_pluck($customisation, 'dishCustomisationId');
                    //     $filtered1              = $customisationItem->whereIn('elementId', $cartCustomisationId);

                    //     $customisationTotal = $filtered1->reduce(function ($carry, $item) {

                    //         return $carry + $item->Price;
                    //     });

                    //     $dishes->dishTotal = ($dish->price + $customisationTotal) * $cart->quantity;

                    // } else {

                    //     $dishes->dishTotal = $dish->price * $cart->quantity;
                    // }



                                    if (!empty($orderCustomisationItems)) {

                    $customisationTotal = $orderCustomisationItems->reduce(function ($carry, $item) {
                        return $carry + $item->price;
                    });
// print_r($customisationTotal);
// die;
                    $dishes->dishTotal = ($cart->price + $customisationTotal) * $cart->quantity;

                } else {

                    $dishes->dishTotal = $cart->price * $cart->quantity;
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
                $orderDetails->displaydate      = date('F j, g:i a', strtotime($order->created_at));
                $orderDetails->displayDish      = implode(', ', array_column($orderDish, 'dishplayDish'));
                $orderDetails->orderId          = $order->Id;
                // $orderDetails->created_at       = $order->created_at;
                /* orderData preview array */
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

            $data->error = Common::error_true;
            $data->errorMessage = __('validation.noOrders');

        }
           
        return $data;


    }

    public function getOrderDish($carts)
    {

        $dishRepostitory = new DishRepostitory();
        $data = array();
        $currencyRepostitory = new CurrencyRepostitory();
        $orderDish = array();
        foreach ($carts as $cart) {
            $dish = $dishRepostitory->getDishes($cart->dishId);
            $dishes = new Dishes();
            $dishes->dishplayDish = $dish->dishName . ' ' . 'X' . $cart->quantity;
            $dishes->isVeg = $dish->isVeg;
            $currency = $currencyRepostitory->getCurrency();
            if ($cart->customisationId) {

                $customisationItem = $dishRepostitory->getCustomisationItem($cart->dishId);
                $customisation = array_flatten(json_decode($cart->customisationId));
                $cartCustomisationId = array_pluck($customisation, 'dishCustomisationId');
                $filtered1 = $customisationItem->whereIn('elementId', $cartCustomisationId);

                $customisationTotal = $filtered1->reduce(function ($carry, $item) {

                    return $carry + $item->Price;
                });

                $dishes->dishTotal = ($dish->price + $customisationTotal) * $cart->quantity;

            } else {

                $dishes->dishTotal = $dish->price * $cart->quantity;
            }
            $dishes->displayPrice = $currency . $dishes->dishTotal;

            array_push($orderDish, $dishes);

        }

        return $orderDish;

    }


    /* total Calculation */
    public function getCharges($outletId, $dishes, $couponName,$paymentMethod,$orderdiscount)
    {  
        $cartService = new CartService();
        $totalcharges[] = $cartService->getItemTotal($dishes);
        $totalcharges[] = $cartService->getCharges($outletId, $dishes);
        $totalcharges[] =  $this->slashedPriceDiscount($orderdiscount); 
        $totalcharges[] = $cartService->getTaxes();
        //$totalcharges[] = $cartService->getTotals($totalcharges);
        if ($couponName !== NULL) {

        $couponDiscount             = $cartService->getcouponeDiscount($couponName);
        $totalcharges[]             = $cartService->getCouponeTotals($totalcharges,$couponDiscount);
        $totalcharges[]             = $cartService->getDiscount($totalcharges);
 
       
        $totalcharges[] = $this->moveElement($totalcharges, 4, 3);

        $total = (object)array();
        $currencyRepostitory = new CurrencyRepostitory();
        $currency = $currencyRepostitory->getCurrency();
        $total->displayKey = $paymentMethod;
        $total->displayValue = $currency . number_format($totalcharges[4][0]->netAmount, 2);

        $totalcharges[] = array($total);

        } else {
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
        }

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

    public function trackOrders($orderId)
    {

        $userId = Auth::guard('api')->user()->Id;
        $orderRepostitory = new OrderRepostitory();
        $order = $orderRepostitory->trackOrders($userId, $orderId);
        $data = new DataService();

        if ($order) {

            $currencyRepostitory = new CurrencyRepostitory();
            $currency = $currencyRepostitory->getCurrency();
            $orders = new Orders();
            $orders->orderId            = $order->Id;
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
            if ($order->Status == 'pickedup') {
            $orders->orderPickedUp = true;
            $orders->orderPickedupTime  = date('h:i:s A', strtotime($order->UpdateAt));
            } else {
            $orders->orderPickedUp = false;
            $orders->orderPickedupTime  = date('h:i:s A', strtotime($order->UpdateAt)); 
            }
            // $orders->orderPickedUp      = (is_null($order->pickedupTime)) ? false : true;
            // $orders->orderPickedupTime  = date('h:i:s A', strtotime($order->pickedupTime));
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
                $orders->deliveredStatus = false;
            }

            if ($order->orderStatus == 'reachUserLocation') {
              $orders->reachUserLocation = true;
            } else {
                $orders->deliveredStatus = false;
            }
            switch ($order->orderStatus)
            {
                case 'assigned' :
                   $orders->restaurantConfirmedDescription =(is_null($order->confirmedTime))? __('validation.unconfirmAssigned'): __('validation.confirmAssigned');
                   break;
                case 'unassigned':
                    $orders->restaurantConfirmedDescription =(is_null($order->confirmedTime))?__('validation.unconfirmUnassigned') : __('validation.confirmUnassigned');
                    break;
                default :
                    $orders->restaurantConfirmedDescription  =__('validation.defaultOrderStatusDescription');

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


    public function unassignOrder()
    {

        $orderRepostitory = new OrderRepostitory();
        $orders = $orderRepostitory->unassignOrder();
        $data = new DataService();
        if($orders){
            $data->error         = Common::error_false;
            $data->errorMessage  = __('validation.sucess');
            $data->deliverystaff = $this->assignOrder();

        }else{
            $data->error         = Common::error_true;
            $data->errorMessage  = __('validation.failure');
        }
        return $data;
    }

    public function assignOrder()
    {
        $orderRepostitory = new OrderRepostitory();
        $assignedstaff    = $orderRepostitory->getDeliveystaff();

        $assignedStaffIds  = array_pluck($assignedstaff,'staffId');
        $unassignedstaffIds= $orderRepostitory->unassignedStaff($assignedStaffIds);

        if($unassignedstaffIds){

            foreach($unassignedstaffIds as $staff){

                $gcpm   = new FCMPushNotification();
                $title  = __('validation.assignedOrder');
                $message = __('validation.assignedOrder');
                $os=$staff['os'];
                $body = array('image' => "NULL",
                              'title' => $title,
                              'notification_type'=>'assign',
                              'orderId'=>"NULL",
                              );
                $gcpm->setDevices($staff['deviceToken']);
                $data= $gcpm->send($message, $body,$os,$title, $message);
            }

            $send = true;
        }else{

            $send = false;
        }

     return $send;

    }


    public function getOrderDetail($orderId)
    {
        $userId           = Auth::guard('api')->user()->Id;
        $orderRepostitory = new OrderRepostitory();
        $order            = $orderRepostitory->getOrderDetail($userId, $orderId);

        $data = new DataService();
        if ($order) {
            $cartRepostitory        = new CartRepostitory();
            $dishRepostitory        = new DishRepostitory();
            $currencyRepostitory    = new CurrencyRepostitory();
            $outletsRepostitory     = new OutletsRepostitory();
            $currency               = $currencyRepostitory->getCurrency();
            
            $orderDish  = array();
            $carts      = $orderRepostitory->orderDish($order->Id);
        
// order dish carts items list
            foreach ($carts as $cart) {


                $dishes               = new Dishes();
                $dishes->dishplayDish = $cart->dishName . ' ' . 'X' . $cart->quantity;
                $dishes->isVeg        = $cart->isVeg;
                $dishes->quantity     =$cart->quantity;


                $orderCustomisationItems = $orderRepostitory->orderCustomisationItems($cart['id']);


                if (!empty($orderCustomisationItems)) {

                    $customisationTotal = $orderCustomisationItems->reduce(function ($carry, $item) {
                        return $carry + $item->price;
                    });

                    $dishes->dishTotal = ($cart->price + $customisationTotal) * $cart->quantity;

                } else {

                    $dishes->dishTotal = $cart->price * $cart->quantity;
                }
                $dishes->displayPrice = $currency .$dishes->dishTotal;
               
                array_push($orderDish, $dishes);

            }
            $outlet = $outletsRepostitory->getOutlet($order->outletId);
            $orderdata = new Orders();
            $orderdata->orderId              = $order->id;
            $orderdata->displayOrderId       = $order->orderReferenceId;
            $netAmount                       = number_format($order->netAmount, 2);
            $orderdata->netAmount                       = number_format($order->netAmount, 2);
            $orderdata->displayNetAmount     = $currency . $netAmount;
            $orderdata->displayTotalItems    = count($orderDish) . __('validation.item');
            $orderdata->outletId             = $outlet->id;
            $orderdata->outletName           = $outlet->name;
            $orderdata->contactNumber        = $outlet->contactNumber;
            $orderdata->latitude           = $outlet->latitude;
            $orderdata->longitude           = $outlet->longitude;
            $orderdata->s2CellId           = $outlet->s2CellId;
            $orderdata->serviceCommission           = $outlet->serviceCommission;
            $orderdata->outletAddress        = $outlet->addressLineOne . ',' . $outlet->street . ',' . $outlet->area . ',' . $outlet->city;
            $orderdata->userAddressType      = $order->deliveryAddressType;
            $orderdata->userAddress          = $order->deliveryAddress;
            $orderdata->isdelivered          = (is_null($order->deliveredTime)) ? "false" : "true";
            $orderdata->deliveriedByAndTime  = "Order Delivered on " . date('F j, g:i a',
                    strtotime($order->updated_at));
            $orderdata->paymentMethod = ($order->PaymentTypeId == '10') ? __('validation.payedCash')  : __('validation.payedCard');

            /** charges calculation  for orders */
            $orderdata->dishes      = $orderDish;
            $orderdata->restaurantDeviceToken      = $outlet->deviceToken;
            $orderdata->os      = $outlet->os;
            $orderdata->charges     = $this->getCharges($outlet->id, array_flatten($orderDish), $order->couponName, $orderdata->paymentMethod,$order->discount);

            $data->error        = Common::error_false;
            $data->errorMessage = __('validation.sucess');
            $data->orderDetails = $orderdata;

        } else {

            $data->error        = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }
        return $data;

    }

     public function addRating($ratingdata){

       $userId           = Auth::guard('api')->user()->id;
       $orderRepostitory = new OrderRepostitory();
        $ratings= $orderRepostitory->addRating($ratingdata,$userId);
        $data = new DataService();
        if($ratings){
            $ratings                = $orderRepostitory->updateRatingStatus($ratingdata->orderId,$userId);
            $data->error = Common::error_false;
            $data->errorMessage = __('validation.sucess');

        }else{
            $data->error = Common::error_true;
            $data->errorMessage = __('validation.failure');
        }
        return $data;
    } 

   public function skipRating($ratingdata){

   $userId           = Auth::guard('api')->user()->id;
   $orderRepostitory = new OrderRepostitory();
    $ratings= $orderRepostitory->skipRating($ratingdata,$userId);
    $data = new DataService();
    if($ratings){
        $data->error = Common::error_false;
        $data->errorMessage = __('validation.sucess');

    }else{
        $data->error = Common::error_true;
        $data->errorMessage = __('validation.failure');
    }
    return $data;
}    

}
<?php
namespace App\Http\Repository;

use App\DeliveryStaff;
use App\Http\Utility\Constant;
use App\User;
use App\Cart;
use App\CartCustomisations;
use App\Dishes;
use App\Restaurant;
use App\Outlets;
use App\Setting;
use App\DishesCustomisation;
use App\DishesCustomisationCategories;
use App\Http\Repository\CurrencyRepostitory;
use App\OrderItems;
use App\OrderItemsCustomisations;
use App\Orders;
use App\Wallet;
use App\Transaction;
use App\IntegrationSetting;
// use APP\Reviews;
use App\Http\Service\AppconfigService;
use DB;

Class OrderRepostitory{


    public function addOrder($data)
    {

        DB::beginTransaction();
        try {

            $currencyRepostitory    = new CurrencyRepostitory();
            $outletsRepostitory     = new OutletsRepostitory();
            $currency               = $currencyRepostitory->getCurrency();
            $orders                      = new Orders();
            $orders->UserId              = $data->userId;
            $orders->outletId            = $data->outletId;
            $orders->deliveryAddressId   = $data->deliveryAddressId;
            $orders->netAmount           = $data->netAmount;
            $orders->TotalAmount         = $data->netAmount;
            $orders->DiscountAmount      = $data->discount;
            $orders->CouponCode          = $data->couponName;
            $orders->orderReferenceId    = $data->orderRefferenceId;
            if ($data->paymentType = 10) {
            $orders->PaymentMode       = 'cash';
            } else {
            $orders->PaymentMode       = 'Card';
            }
            $orders->ToLocation     = $data->deliveryAddress;
            $orders->DestinyLat     = $data->DestinyLat;
            $orders->DestinyLong    = $data->DestinyLong;
            $orders->CreateAt       = now();
            $orders->UpdateAt       = now();
            $orders->Status         = 'waiting';
            $orders->Type           = 'delivery';
            $orders->ProviderRejectedIds  = "[]";
            $orders->AssignedProviderIds  = "[]";
            $orders->Estimation  = $data->netAmount;
            $orders->CurrencyType  = $currency;
            $orders->RideName  = 'Food Delivery';
            // $orders->deliveryAddressType = $data->addressType;
            $orders->orderStatus         = $data->orderStatus;
            // $orders->orderPlaceTime      =  date('Y-m-d H:i:s');
            // $orders->deliverycharge      = $data->deliverycharge;
            if ($data->orderSuggestions) {
            $orders->Description     = $data->orderSuggestions;
            } else { 
            $orders->Description     = ' ';
            }
            
            $orders->save();
        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresponse = $ex->getMessage();
            // print_r($jsonresponse);
            DB::rollBack();
            return false;
        }
        if ($orders->id) {
            try {
//
                    $c1 =array_values($data->cartId);

                    $c2 = data_fill($c1,'*.orderId',$orders->id);
                    $c3 = data_fill($c2,'*.userId', $data->userId);
                    $c4 = data_fill($c3,'*.outletId',$data->outletId);
                    $carts = $c4;


                foreach($carts as $cart){

                    
                    $carts = Cart::where(['outletId' => $cart->outletId])
                                ->where(['id' => $cart->cartId])
                                // ->where(['userId' => $cart->userId])
                                ->first();
                                
                    $dishlist = $this->getDishesList($carts->dishId);
                   

                    try {
                        $dishess             = new OrderItems();
                        $dishess->orderId    = $cart->orderId;
                        $dishess->dishId     = $dishlist->id;
                        $dishess->dishName   = $dishlist->name;
                        $dishess->quantity   = $carts->quantity;
                        $dishess->isVeg      = $dishlist->isVeg;
                        $dishess->price      = $dishlist->price;
                        $dishess->save();



                    } catch (\Illuminate\Database\QueryException $ex) {
                            $jsonresp = $ex->getMessage();
                            return false;

                    }


                    if (!empty($carts->customisationId)) {
                     $customisation=$this->getDishCustomisationList($carts->dishId);
                    $customisationitem          = array_flatten(json_decode($carts->customisationId));                     
                    $cartCustomisationId    = array_pluck($customisationitem, 'dishCustomisationId');

                    $filtered1  = $customisation->whereIn('dishCustomisationId', $cartCustomisationId);     

                      data_fill($filtered1,'*.orderItemId',$dishess->id);//key add for existing array
                      data_fill($filtered1,'*.created_at',NOW());
                      data_fill($filtered1,'*.updated_at',NOW());
                      $dishCustomisation=json_decode(json_encode($filtered1),true);
                      // print_r($dishCustomisation);


                      $dishCustomisationItems = OrderItemsCustomisations::insert($dishCustomisation);
                    }
 

                }

            } catch (\Illuminate\Database\QueryException $ex) {
                $jsonresp = $ex->getMessage();
                return false;
            }
        }

         DB::commit();


        return $orders->id;
    }


    public function listPastOrders($userId)
    {
        $data = Orders::where('userId',$userId)
                        ->orderby('id', 'DESC')
                        ->get();

        return $data;
    }


    public function getCartDetails($orderId){
        $data= Cart::where('orderId',$orderId)->get();
        return $data;
    }


    public function trackOrders($userId,$orderId)
    {

        $data = Orders::select('Booking.*','Address.latitude as userLatitude','Address.longitude as userLongitude','Provider.latitude as deliveryStaffLatitude','Provider.longitude as deliveryStaffLongitude','Outlets.latitude as outletlatitude','Outlets.longitude as outletLongitude',DB::raw("count(order_Items.orderId) as itemCount"))
                      ->leftjoin('Outlets','Booking.outletId','=','Outlets.id')
                      ->leftjoin('order_Items','Booking.id','=','order_Items.orderId')
                      ->leftjoin('Address','Booking.deliveryAddressId','=','Address.id')
                      ->leftjoin('Provider','Booking.ProviderId','=','Provider.id')
                      ->where(['Booking.userId'=>$userId,'Booking.id'=>$orderId])
                      ->groupBy('Booking.id')
                      ->first();

        return  $data;
    }


    public function unassignOrder()
    {

        $orders = Orders::whereNull('acceptedTime')->get();

        return $orders;
    }

    public function getDishesList($dishId)
    {

        $dishItems= Dishes::select('*')                        
                                    ->where('id', $dishId)
                                     ->first();

        return $dishItems;


    }


    public function getDishCustomisationList($dishId){
        $customisationItems = DishesCustomisation::select('name as dishCustomisationName', 'id as dishCustomisationId', 'price')->where('dishId',$dishId)->get();
        return $customisationItems;
    }


    public function getDeliveystaff()
    {

        $assignedstaff= DeliveryStaff::select('DeliveryStaff.id as staffId','DeliveryStaff.fcmtoken as devicetoken','DeliveryStaff.os')
                                    ->leftjoin('Orders','Orders.deliverystaffId','=','DeliveryStaff.id')
                                    ->whereNotNull('Orders.acceptedTime')
                                     ->get();


        return $assignedstaff;


    }


    public function unassignedStaff($staffId)
    {

        $data = DeliveryStaff::select('DeliveryStaff.id as staffId','DeliveryStaff.fcmtoken as devicetoken','DeliveryStaff.os')
                               ->whereNotIn('id',$staffId)->get();

        return $data;

    }

    public function getOrderDetail($userId, $orderId)
    {
        $order= Orders::where(['userId'=>$userId,'Id'=>$orderId])->first();

        return $order;
    }

    public function getUserOrder($userId, $pageNumber)
    {
        $perPage = Constant::PERPAGE;
        $orders = Orders::where('userId',$userId)
                              ->orderby('id', 'DESC')
                              ->paginate($perPage, ['*'], 'page', $pageNumber);
        return $orders;
    }



    //order items dishes querys

    public function orderDish($orderId)
    {

        $data = array();
        $data = OrderItems::select('id','dishId','orderId', 'dishName', 'price', 'isVeg', 'quantity')
            ->where('orderId', $orderId)
            ->get();
        return $data;
    }

    public function orderCustomisationItems($orderitemId)
    {

        $currencyRepostitory = new CurrencyRepostitory();
        $currency            = $currencyRepostitory->getCurrency();
        $data = OrderItemsCustomisations::select('dishCustomisationId as elementId', 'dishCustomisationName as elementName', 'price', DB::raw("CONCAT('$currency',FORMAT(price,2)) AS displayPrice"))
            ->where('orderItemId',$orderitemId)
            ->get();

        return $data;
    }

public function orderCustomisationCategory($dishId)
    {
        $data = array();
        $data = DishesCustomisationCategories::select('Dishes_Customisation_Categories.id as customisationCategoryId', 'Dishes_Customisation_Categories.name as customisationName', 'Dishes_Customisation_Categories.dishId', '.Dishes_Customisation_Categories.categoriesType', 'Dishes_Customisation_Categories.categoriesPathId')
                                           ->join('Customisation_Category','Dishes_Customisation_Categories.categoriesPathId','=','Customisation_Category.id')
                                           ->where('dishId', $dishId)
                                           ->get();

        return $data;

    }
// delivery and provider earnings update 
public function updateOrderDetail($data)
    {
        $orders = Orders::where(['id'=>$data->orderId,'userId'=>$data->userId])
                        ->update(['distance' =>$data->distance,'providerEarnings'=>$data->deliverycharge,'distanceCharges'=>$data->distanceCharges, 'adminServiceCharge' => $data->adminServiceCharge, 'outletEarnings'=>$data->outletEarnings]);
        return $orders;
    }

public function updateLastMile($lastMileData)
    {
        $orders = Orders::where(['id'=>$lastMileData->orderId])
                        ->update(['lastMile' =>$lastMileData->outletToRestaurantDistance,'eta'=>$lastMileData->etaInTimestamp,'SourceLat'=>$lastMileData->SourceLat,'SourceLong'=>$lastMileData->SourceLong,'s2CellId'=>$lastMileData->s2CellId,'FromLocation'=>$lastMileData->outletAddress,'Distance'=>$lastMileData->outletToRestaurantDistance,'OutletName'=>$lastMileData->outletName,'serviceCommission'=>$lastMileData->serviceCommission,'ContactNo'=>$lastMileData->contactNumber]);
        return $orders;
    }

public function updateFirstMile($orderId,$distance,$etaInMinutes)
    {
        $orders = Orders::where(['id'=>$orderId])
                        ->update(['firstMile' =>$distance,'eta'=>$etaInMinutes]);
        return $orders;
    }

 // public function findRatingStatus($userId)
 //    {

 //        $data = Orders::select('Orders.id as orderId','Orders.outletId as outletId','Orders.deliveryStaffId','Outlets.name as outletName','DeliveryStaff.name as deliverystaffName','Orders.deliveredTime as deliveredTime')
 //                        ->leftjoin('Outlets','Outlets.id','=','Orders.outletId')
 //                        ->leftjoin('DeliveryStaff','DeliveryStaff.id','=','Orders.deliveryStaffId')
 //                        ->where(['Orders.userId'=>$userId,'Orders.isRated'=>'NOTRATED'])
 //                        ->first();
 //        return $data;
 //    }

    public function findRatingStatus($userId)
    {
        // if (!$type){
        //     $type = 'Food';
        //  } else {
        //     $data = $type;
        //  }
        $data = Orders::select('Booking.Id as orderId','Booking.outletId as outletId','Booking.ProviderId as deliveryStaffId','Outlets.name as outletName','Provider.FirstName as deliverystaffName','Booking.updated_at as deliveredTime','Booking.orderReferenceId')
                        ->leftjoin('Outlets','Outlets.id','=','Booking.outletId')
                        ->leftjoin('Provider','Provider.Id','=','Booking.ProviderId')
                        ->where(['Booking.UserId'=>$userId,'Booking.isRated'=>'NOTRATED','Booking.orderStatus'=>'delivered'])
                        ->first();
        return $data;
    }

 public function updateRatingStatus($data,$userId)
    {
        if (!$data) {

            $integrationSetting = DB::table('Setting')->where('key','showRatingPopupAfter')->first();
            // IntegrationSetting::where(['key'=>'showRatingPopupAfter'])->value('value');

          $orders = Orders::where(['isRated'=>'NOTRATED','userId'=>$userId])
                        ->whereRaw('deliveredTime >= NOW() - INTERVAL 1 MINUTE')
                        ->update(['isRated' =>'SKIP']);              
        } else {
          $orders = Orders::where(['id'=>$data])
                        ->update(['isRated' =>'RATED']);  
        }
        return $orders;
    }
    

public function addRating($data,$userId)
    {
        if ($data->feedback) {
          $feedback = $data->feedback;
        } else {
          $feedback = 'NULL';
        }
             
          $orders = DB::table('User_ReviewsProvider')->insert([
                ['userId'=>$userId,'outletId'=>$data->outletId,'staffId'=>$data->staffId,'orderId'=>$data->orderId,'orderRating'=>$data->orderRating,'deliveryRating'=>$data->deliveryRating,'feedback'=>$feedback]
            ]);
        return $orders;
    }

  public function skipRating($data,$userId)
    {
        
          $orders = Orders::where(['isRated'=>'NOTRATED','userId'=>$userId])
                        ->update(['isRated' =>'SKIP']);
        return $orders;
    }
    
      public function newCurrentOrders($outletId)
    {
        $data = Orders::select('Booking.*','Provider.Id as deliveryStaffId','Provider.FirstName as staffName')
                        ->where('outletId',$outletId)
                        ->where('orderStatus','unassigned')
                        ->whereNotIn('Booking.Status', ['completed','cancelled'])
                        ->leftjoin('Provider', function ($join) {
                            $join->on('Booking.ProviderId', '=', 'Provider.Id');
                        })
                        ->orderby('Booking.Id', 'DESC')
                        ->get();

        return $data;
    }
      public function newOrders($outletId)
    {
        $data = Orders::where('outletId',$outletId)
                        ->where('Status','unassigned')
                        ->whereNull('confirmedTime')
                        ->orderby('id', 'DESC')
                        ->get();

        return $data;
    } 

    public function debitWallet($walletUpdate)
    {
        print_r($walletUpdate['Amount']);
        $Wallet = Wallet::where(['UserTypeId'=>$walletUpdate['UserTypeId'],'UserType'=>$walletUpdate['UserType']])
                         ->decrement('Balance', $walletUpdate['Amount']);
        return $Wallet;
    } 

    public function createTransaction($data)
    {

                 try {
                $Transaction             = new Transaction();
                $Transaction->UserType    = $data['UserType'];
                $Transaction->Description     = $data['description'];
                $Transaction->UserTypeId   = $data['UserTypeId'];
                $Transaction->Amount   = $data['Amount'];
                $Transaction->Type      = $data['type'];
                $Transaction->Status      = 'success';
                $Transaction->save();



            } catch (\Illuminate\Database\QueryException $ex) {
                    $jsonresp = $ex->getMessage();
                    return false;

            }
        return $Transaction;
    }  
}



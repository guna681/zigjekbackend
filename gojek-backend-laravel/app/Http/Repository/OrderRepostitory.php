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
use App\OrderItems;
use App\OrderItemsCustomisations;
use App\Orders;
use App\IntegrationSetting;
// use APP\Reviews;
use App\Http\Service\AppconfigService;
use DB;

Class OrderRepostitory{


    public function addOrder($data)
    {

        DB::beginTransaction();
        try {
            $orders                      = new Orders();
            $orders->UserId              = $data->userId;
            $orders->outletId            = $data->outletId;
            $orders->deliveryAddressId   = $data->deliveryAddressId;
            $orders->netAmount           = $data->netAmount;
            $orders->DiscountAmount      = $data->discount;
            $orders->CouponCode          = $data->couponName;
            $orders->orderReferenceId    = $data->orderRefferenceId;
            $orders->PaymentMode       = $data->paymentType;
            $orders->ToLocation     = $data->deliveryAddress;
            $orders->CreateAt       = now();
            $orders->UpdateAt       = now();
            // $orders->deliveryAddressType = $data->addressType;
            $orders->orderStatus         = $data->orderStatus;
            // $orders->orderPlaceTime      =  date('Y-m-d H:i:s');
            // $orders->deliverycharge      = $data->deliverycharge;
            // if ($data->orderSuggestions) {
            // $orders->orderSuggestions     = $data->orderSuggestions;
            // } else { 
            // $orders->orderSuggestions     = ' ';
            // }
            
            $orders->save();
        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresponse = $ex->getMessage();
            
            DB::rollBack();
            return false;
        }
        if ($orders->Id) {
            try {
//
                    $c1 =array_values($data->cartId);

                    $c2 = data_fill($c1,'*.orderId',$orders->Id);
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

        $data = Orders::select('Orders.*','Address.latitude as userLatitude','Address.longitude as userLongitude','DeliveryStaff.latitude as deliveryStaffLatitude','DeliveryStaff.longitude as deliveryStaffLongitude','Outlets.latitude as outletlatitude','Outlets.longitude as outletLongitude',DB::raw("count(order_Items.orderId) as itemCount"))
                      ->leftjoin('Outlets','Orders.outletId','=','Outlets.id')
                      ->leftjoin('order_Items','Orders.id','=','order_Items.orderId')
                      ->leftjoin('Address','Orders.deliveryAddressId','=','Address.id')
                      ->leftjoin('DeliveryStaff','Orders.deliveryStaffId','=','DeliveryStaff.id')
                      ->where(['Orders.userId'=>$userId,'Orders.id'=>$orderId])
                      ->groupBy('Orders.id')
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

public function updateLastMile($orderId,$distance,$eta)
    {
        $orders = Orders::where(['id'=>$orderId])
                        ->update(['lastMile' =>$distance,'eta'=>$eta]);
        return $orders;
    }

public function updateFirstMile($orderId,$distance,$etaInMinutes)
    {
        $orders = Orders::where(['id'=>$orderId])
                        ->update(['firstMile' =>$distance,'eta'=>$etaInMinutes]);
        return $orders;
    }

 public function findRatingStatus($userId)
    {

        $data = Orders::select('Orders.id as orderId','Orders.outletId as outletId','Orders.deliveryStaffId','Outlets.name as outletName','DeliveryStaff.name as deliverystaffName','Orders.deliveredTime as deliveredTime')
                        ->leftjoin('Outlets','Outlets.id','=','Orders.outletId')
                        ->leftjoin('DeliveryStaff','DeliveryStaff.id','=','Orders.deliveryStaffId')
                        ->where(['Orders.userId'=>$userId,'Orders.isRated'=>'NOTRATED'])
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
    

}



<?php

namespace App\Http\Repository;

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
use App\DeliveryStaff;
use App\Http\Service\AppconfigService;
use DB;
use App\Http\Utility\Constant;
Class OrderManagementRepostitory
{


    public function listPreviousOrders($pageNumber, $outletId)
    {
        $perPage = Constant::PERPAGE;
        $data    = Orders::select('Orders.id as orderId','Orders.orderReferenceId','Orders.netAmount','Orders.orderStatus','Orders.orderPlaceTime','Users.mobileNumber','Users.email','Orders.updated_at')
                         ->leftjoin('Users','Orders.userId','=','Users.id')
                         ->where(['Orders.orderStatus'=>'DELIVERED'])
                         ->where('outletId',$outletId)
                         ->orderby('Orders.id', 'DESC')
                         ->paginate($perPage, ['*'], 'page', $pageNumber);

       return $data;
    }




    public function listOngoingOrders($pageNumber,$outletId)
    {

        $perPage = Constant::PERPAGE;
        $data    = Orders::select('Booking.id as orderId','Booking.orderReferenceId','Booking.netAmount','Booking.Status as orderStatus','Booking.created_at','Users.Mobile','Users.Email','Booking.updated_at')
                          ->leftjoin('Users','Booking.userId','=','Users.id')
                          // ->where('Booking.Status','=','unassigned')
                          ->where('outletId',$outletId)
                          ->where('Booking.RideName','food Delivery')
                          // ->whereNotIn('Booking.Status', ['completed','cancelled'])
                          ->orderby('Booking.id', 'DESC')
                          ->paginate($perPage, ['*'], 'page', $pageNumber);

        return $data;
    }
    public function listPastOrders($pageNumber,$outletId)
    {

        $perPage = Constant::PERPAGE;
        $data    = Orders::select('Booking.id as orderId','Booking.orderReferenceId','Booking.netAmount','Booking.Status as orderStatus','Booking.created_at as orderPlaceTime','Booking.confirmedTime','Users.Mobile','Users.Email','Booking.updated_at')
                          ->leftjoin('Users','Booking.userId','=','Users.Id')
                          // ->where('Orders.orderStatus','=','DELIVERED')
                          ->whereIN('Booking.Status', ['completed','cancelled'])
                          ->where('outletId',$outletId)
                          ->orderby('Booking.Id', 'DESC')
                          ->paginate($perPage, ['*'], 'page', $pageNumber);

        return $data;
    }

    public function listCurrentOrders($pageNumber,$outletId)
    {

        $perPage = Constant::PERPAGE;
        $data    = Orders::select('Orders.id as orderId','Orders.orderReferenceId','Orders.netAmount','Orders.Status as orderStatus','Orders.orderPlaceTime','Orders.confirmedTime','Users.mobileNumber','Users.email','Orders.updated_at','Orders.markReady','DeliveryStaff.name as staffName','Orders.restaurantEta')
                          ->leftjoin('Users','Orders.userId','=','Users.id')
                          ->leftjoin('DeliveryStaff', function ($join) {
                            $join->on('Orders.deliveryStaffId', '=', 'DeliveryStaff.id');
                        })
                          ->whereNotIn('Orders.Status', ['completed','cancelled'])
                          ->where('outletId',$outletId)
                          ->orderby('Orders.Id', 'DESC')
                          ->paginate($perPage, ['*'], 'page', $pageNumber);

        return $data;
    }

    public function getOrder($orderId, $outletId)
    {
        $orders =Orders::select(DB::raw("Booking.*,Users.Id as userId,Users.FirstName,Users.Mobile,Users.Email,Users.ExtCode,Provider.FirstName as staffName,Provider.Mobile as staffMobileNumber,Provider.Email as staffeEmail"))
                        ->leftjoin('Users','Booking.UserId','=','Users.Id')
                        ->leftjoin('Provider', function ($join) {
                            $join->on('Booking.ProviderId', '=', 'Provider.Id');
                        })
                        ->where(['Booking.id'=>$orderId ,'Booking.outletId' =>$outletId])
                        ->first();

        return $orders;
    }

    public function getOrderListPopup($outletId)
    {
        $orders =Orders::select("*")
                        ->where(['Status'=>'unassigned','confirmedTime' => NULL])
                        // ->whereNotIn('Orders.Status', ['cancelled'])
                        ->where('outletId',$outletId)
                        // ->where('isOrderViewed','0')
                        ->orderby('id', 'DESC')
                        ->get();

        return $orders;
    }    


public function updateOrderViewStatus($arg)
    {
        DB::beginTransaction();
        try{
            $data = '1';
            $update= Orders::where('outletId',$arg)->update(['isOrderViewed' => 1]);
        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        return true;
    }



    public function update_OrderStatus($arg){

        DB::beginTransaction();

        try{

            if($arg->orderStatus == 1) {
                $update= Orders::where('Id',$arg->orderId)->update(['confirmedTime'=>NOW()]);
            } else {
                $update = Orders::where('Id',$arg->orderId)->update(['Status'=>'cancelled']);

            }
            

        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        return true;


    }


    public function updateOrderStatus($arg, $outletId)
    {

        DB::beginTransaction();

        try{

            $update= Orders::where('id',$arg->orderId)->update(['confirmedTime'=>NOW()]);

        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        return true;
    }


    public function listOutletsOrders($pageNumber)
    {

        $perPage = Constant::PERPAGE;
        $data    = Orders::select('Booking.id as orderId','Booking.orderReferenceId','Booking.netAmount','Booking.orderStatus','Users.Mobile','Users.Email','Booking.created_at','Booking.updated_at','Booking.confirmedTime')
                          ->leftjoin('Users','Booking.UserId','=','Users.id')
                        //   ->where('Orders.orderStatus','<>','DELIVERED')
                        //   ->whereDate('Orders.created_at', DB::raw('CURDATE()'))
                          ->where('Booking.Type','=','delivery')
                          ->orderby('Booking.id', 'DESC')
                          ->paginate($perPage, ['*'], 'page', $pageNumber);
        return $data;
    }




    public function getAdminOrders($orderId)
    {
        $orders =Orders::select(DB::raw("Booking.*,Users.FirstName,Users.Mobile,Users.Email,Users.ExtCode,Provider.FirstName as staffName,Provider.Mobile as staffMobileNumber,Provider.Email as staffeEmail,Outlets.email as outletEmail,Outlets.name as OutletName,Outlets.addressLineOne,Outlets.addressLineTwo,Outlets.street,Outlets.area,Outlets.city,Outlets.state,Outlets.contactNumber"))
                 ->leftjoin('Users','Booking.userId','=','Users.id')
                 ->leftjoin('Outlets','Booking.OutletId', '=', 'Outlets.id')
                 ->leftjoin('Provider', function ($join) {
                $join->on('Booking.ProviderId', '=', 'Provider.Id');
                     })
                 ->where(['Booking.id'=>$orderId,'Booking.RideName'=>'Food Delivery'])
                 ->first();

        return $orders;
    }




    public function updateAdminOrderStatus($arg)
    {

        DB::beginTransaction();

        try{

            $update= Orders::where('id',$arg->orderId)->update(['confirmedTime'=>NOW()]);

        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        return true;
    }


    public function getOutletsList()
    {
        $orders =Outlets::select("id","restaurantId","email","name","contactNumber")
                 ->get();

        return $orders;
    }

    public function getOrdersDate()
    {
        $orders =Orders::select(DB::raw("DISTINCT(date(created_at) ) as date"))
                 ->get();

        return $orders;
    }


    public function getDeliveryStaffs()
    {
        $Deliveryboy =DeliveryStaff::select("id","name","mobileNumber","email","countryCode")
                 ->get();
        return $Deliveryboy;
    }

       // public function getOrderReportsData($sql)
    // {
    //     $result = DB::select($sql);
    //     return $result;
    // }

    public function getPayOutlet(){
		$data=Outlets::select('Outlets.id','Outlets.name','Outlets.image','Outlets.city','Outlets.state','Outlets.country','Outlets.zipcode','Outlets.contactNumber','Outlets.balanceAmount','Outlets.totalAmount','Restaurant.name as restaurantName')
		            ->join('Restaurant','Restaurant.id','=','Outlets.restaurantId')
		            ->where('balanceAmount','!=',0.00)
		            ->paginate(10);
		return $data;
    }
    
    public function getRestaurantList()
    {
        $restaurant =Restaurant::select("Restaurant.id",'Restaurant.name')
                 ->get();

        return $restaurant;
    }


    public function getOrderReportsData($arg)
    {
  
        $result = Orders::selectRAW('Orders.*,Outlets.restaurantId,Users.userName as username,Users.mobileNumber as usermobile,Restaurant.name as restaurantname,Outlets.email as outletemail,Outlets.name as outletname,Outlets.contactNumber as outletnumber,DeliveryStaff.name as deliveryboyname,DeliveryStaff.email as deliveryboyemail,DeliveryStaff.mobileNumber as deliveryboymobile')
        ->leftJoin('Outlets', 'Orders.outletId','=','Outlets.id')
        ->leftJoin('DeliveryStaff', 'Orders.deliveryStaffId','=','DeliveryStaff.id')
        ->leftJoin('Restaurant', 'Restaurant.id','=','Outlets.restaurantId')
        ->leftJoin('Users', 'Users.id','=','Orders.userId')
       //->where('Orders','Orders.orderStatus','=',$arg->orderData)
        ->when($arg->search, function ($query) use ($arg) {

            if($arg->fromData!=NULL)
            {
                $query->whereRAW("date(Orders.created_at) >= '$arg->fromData'");
            }

            if($arg->toData!=NULL)
            {
                $query->whereRAW("date(Orders.created_at) <= '$arg->toData'");
            }
            if(!empty($arg->providerData))
            {
                $query->whereIn('Orders.deliveryStaffId',$arg->providerData);
            }
            if(!empty($arg->outletData))
            {
                $query->whereIn('Orders.outletId',$arg->outletData);
            }
            if(!empty($arg->orderData))
            {
                $query->whereIn('Orders.orderStatus',$arg->orderData);
            }
            if(!empty($arg->restaurantData))
            {
                $query->whereIn('Outlets.restaurantId',$arg->restaurantData);
            }
        })
        ->paginate(10);
        return $result;
    }  
    // public function getOrderReportsData($sql)
    // {
    //     $result = DB::select($sql);
    //     return $result;
    // }

    // public function updateOrderViewStatus($arg)
    // {

    //     DB::beginTransaction();

    //     try{
    //         $data = '1';
    //         $update= Orders::where('outletId',$arg)->update(['isOrderViewed' => 1]);

    //     }catch(\Illuminate\Database\QueryException $ex){
    //         $jsonresp=$ex->getMessage();
    //         DB::rollBack();
    //         return false;
    //     }
    //     DB::commit();
    //     return true;
    // }
    public function markReady($arg)
    {

        DB::beginTransaction();

        try{

            $update= Orders::where('id',$arg->orderId)->update(['markReady'=>$arg->markReady]);

        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        return true;
    }


    public function weekSoFar($outletId,$currencySymbol)
    { 
        $fromDate = date("Y-m-d", strtotime('monday this week')). ' 00:00:00'; 
        $toDate   = date("Y-m-d", strtotime('sunday this week')). ' 23:59:59';
        $orders = new Dishes();
        $totalAmount = Orders::where('outletId',$outletId)
                              ->where('Booking.Status','completed')
                              ->whereBetween('Booking.updated_at',[$fromDate,$toDate])
                              ->sum('netAmount');
        $totalOrders = Orders::where('outletId',$outletId)
                              ->where('Booking.Status','completed')
                            ->whereBetween('Booking.updated_at',[$fromDate,$toDate])
                            ->count('id');
         $orders->totalAmount = $currencySymbol. ' ' .$totalAmount;
         $orders->totalOrders = $totalOrders;   
        return $orders;

    }

    public function todayRevenue($outletId,$currencySymbol)
    { 
        $fromDate = date("Y-m-d"). ' 00:00:00'; 
        $toDate   = date("Y-m-d"). ' 23:59:59';
        $orders = new Dishes();
        $totalAmount = Orders::where('outletId',$outletId)
                              ->where('Booking.Status','completed')
                              ->whereBetween('Booking.updated_at',[$fromDate,$toDate])
                              ->sum('netAmount');
        $totalOrders = Orders::where('outletId',$outletId)
                              ->where('Booking.Status','completed')
                            ->whereBetween('Booking.updated_at',[$fromDate,$toDate])
                            ->count('id');
         $orders->totalAmount = $currencySymbol. ' ' .$totalAmount;;
         $orders->totalOrders = $totalOrders;   
        return $orders;

    }

    public function yesterdayRevenue($outletId,$currencySymbol)
    { 
        $fromDate = date('y-m-d',strtotime("-1 days")). ' 00:00:00'; 
        $toDate   = date('y-m-d',strtotime("-1 days")). ' 23:59:59';
        $orders = new Dishes();
        $totalAmount = Orders::where('outletId',$outletId)
                              ->where('Booking.Status','completed')
                              ->whereBetween('Booking.updated_at',[$fromDate,$toDate])
                              ->sum('netAmount');
        $totalOrders = Orders::where('outletId',$outletId)
                              ->where('Booking.Status','completed')
                            ->whereBetween('Booking.updated_at',[$fromDate,$toDate])
                            ->count('id');
         $orders->totalAmount = $currencySymbol. ' ' .$totalAmount;;
         $orders->totalOrders = $totalOrders;   
        return $orders;

    }

   public function dishesEnableDisable($arg)
    {

        DB::beginTransaction();

        try{

            $update= Dishes::where('id',$arg->dishId)->update(['status'=>$arg->status]);

        }catch(\Illuminate\Database\QueryException $ex){
            $jsonresp=$ex->getMessage();
            DB::rollBack();
            return false;
        }
        DB::commit();
        return true;
    }  
}
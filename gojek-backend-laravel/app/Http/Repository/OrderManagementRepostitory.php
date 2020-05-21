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
        $data    = Orders::select('Booking.id as orderId','Booking.orderReferenceId','Booking.netAmount','Booking.orderStatus','Booking.created_at','Users.Mobile','Users.Email','Booking.updated_at')
                          ->leftjoin('Users','Booking.userId','=','Users.id')
                          // ->where('Orders.orderStatus','<>','DELIVERED')
                          ->where('outletId',$outletId)
                          ->where('Booking.RideName','food Delivery')
                          ->orderby('Booking.id', 'DESC')
                          ->paginate($perPage, ['*'], 'page', $pageNumber);

        return $data;
    }


    public function getOrder($orderId, $outletId)
    {
        $orders =Orders::select(DB::raw("Booking.*,Users.FirstName,Users.Mobile,Users.Email,Users.ExtCode,Provider.FirstName as staffName,Provider.Mobile as staffMobileNumber,Provider.Email as staffeEmail"))
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
                        ->where(['orderStatus'=>'unassigned','assignedTime' => NULL,'confirmedTime' => NULL])
                        ->where('outletId',$outletId)
                        ->where('isOrderViewed','0')
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
                $update= Orders::where('id',$arg->orderId)->update(['confirmedTime'=>NOW()]);
            } else {
                $update = Orders::where('id',$arg->orderId)->update(['orderStatus'=>'rejected']);

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
        $data    = Orders::select('Booking.id as orderId','Booking.orderReferenceId','Booking.netAmount','Booking.orderStatus','Users.Mobile','Users.Email','Booking.created_at','Booking.updated_at')
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

    public function getOrderReportsData($sql)
    {
        $result = DB::select($sql);
        return $result;
    }

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
}
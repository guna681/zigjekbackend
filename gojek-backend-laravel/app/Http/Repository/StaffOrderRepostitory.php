<?php

namespace App\Http\Repository;

use App\Http\Utility\Constant;
use App\OrderShipment;
use App\Orders;
use App\DeliveryStaff;
use App\BlockOrderList;

use DB;

Class StaffOrderRepostitory
{


    public function listPastOrders($staffId)
    {

        $orders = Orders::where('deliveryStaffId',$staffId)
                         ->whereNotNull('deliveredTime')
                         ->orderby('id', 'DESC')
                         ->get();

        return $orders;
    }


    public function getOrder($orderId,$staffId)
    {

        $orders = Orders::where(['deliveryStaffId'=>$staffId,'id'=>$orderId])
                        ->first();

        return $orders;

    }

    public function updateDeliveryStaffEarnings($deliveryStaffid, $providerEarnings) {           

        $deliveryStaff = DB::table('DeliveryStaff')->select('id','name','latitude as lat','longitude as lng','s2Key','s2CellId as s2Id','fcmtoken as deviceToken','os', 'totalAmount', 'balanceAmount')
        ->where('id',$deliveryStaffid)
        ->first();   
    if (!empty($deliveryStaff)) {
    $totalAmount = $deliveryStaff->totalAmount + $providerEarnings;
    $balanceAmount = $deliveryStaff->balanceAmount + $providerEarnings;   
}        
            $staffEarningsupdate = DB::table('DeliveryStaff')->where('id',$deliveryStaffid)
                                         ->update(['totalAmount'=> $totalAmount,'balanceAmount'=> $balanceAmount]);
        return $staffEarningsupdate;
    }


    public function getCurrentOrder($staffId){

        $currencyRepostitory    = new CurrencyRepostitory();
        $currency               = $currencyRepostitory->getCurrency();
        $orders= Orders::select(DB::raw("Orders.id as orderId,Orders.outletId,Orders.orderReferenceId,Orders.deliveryAddress as usersAddress,Orders.deliveryAddressType,Users.userName,Outlets.name as outletName,Outlets.addressLineOne as outletAddress,CONCAT('$currency',Orders.netAmount)as netAmount,Orders.orderStatus,case when(Orders.PaymentTypeId) IN ('10') then 'paid by Cash' else 'paid by card' end as paidVia"))
                        ->leftjoin('Users','Orders.userId','=','Users.id')
                        ->leftjoin('Outlets','Orders.outletId','=','Outlets.id')
                        ->where('Orders.orderStatus','!=','rejected')
                        ->where(['Orders.deliverystaffId'=>$staffId])
                        ->whereNull('deliveredTime')->first();


      return $orders;
    }

    
    public function deliveryUpdateProvider($staffId, $status)
    {

        DB::beginTransaction();

        try {

            $deliveryStaff = DeliveryStaff::where(['id'=>$staffId])
                             ->update(['tripStatus'=> $status]);


        }catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }

        DB::commit();
        return true;
    }

    public function acceptOrder($orderId,$staffId)
    {

        DB::beginTransaction();

        try {

            $orders = Orders::where(['id'=>$orderId])
                             ->update(['deliveryStaffId'=>$staffId,'orderStatus'=>Constant::ACCEPTED,'confirmedTime'=>NOW(),'acceptedTime'=>NOW(),'updated_at'=>NOW()]);


        }catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }

        DB::commit();
        return true;
    }


    public function rejectOrder($orderId, $staffId)
    {

        DB::beginTransaction();

        try {

            $orders = Orders::where(['id' => $orderId])
                            ->update(['deliveryStaffId' => "0", 'orderStatus' => Constant::UNASSIGNED,'updated_at' => NOW(),'assignedTime'=>NULL]);
             $deliverystaff = DeliveryStaff::where(['id' => $staffId])
                            ->update(['tripStatus' => 0 ]);               


        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();

            DB::rollBack();
            return false;
        }

        DB::commit();
        return true;
    }


        public function getOrderUsingId($orderId)
    {

        $orders = Orders::where(['id'=>$orderId])
                        ->first();

        return $orders;

    }
    
    public function pickedupOrder($orderId, $staffId)
    {

        DB::beginTransaction();

        try {

            $orders = Orders::where(['id' => $orderId,'deliveryStaffId' => $staffId])
                            ->update([ 'orderStatus' => Constant::PICKEDUP, 'pickedupTime' => NOW(), 'updated_at' => NOW()]);


        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }

        DB::commit();
        return true;
    }


    public function deliveredOrder($orderId, $staffId)
    {

        DB::beginTransaction();

        try {

            $orders = Orders::where(['id' => $orderId,'deliveryStaffId' => $staffId])
                            ->update([ 'orderStatus' => Constant::DELIVERED, 'deliveredTime' => NOW(), 'updated_at' => NOW()]);

           $deliverystaff = DeliveryStaff::where(['id' => $staffId])
                            ->update(['isReleased' => 0 ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            $jsonresp = $ex->getMessage();
            DB::rollBack();
            return false;
        }

        DB::commit();
        return true;
    }


    public function getAssignedOrder($staffId)
    {

        $currencyRepostitory    = new CurrencyRepostitory();
        $currency               = $currencyRepostitory->getCurrency();
        $orders = Orders::select(DB::raw("Orders.id as orderId,Orders.orderReferenceId,Orders.deliveryAddress as usersAddress,Orders.deliveryAddressType,Users.userName,Outlets.name as outletName,Outlets.addressLineOne as outletAddress,CONCAT('$currency',Orders.netAmount)as netAmount,case when(Orders.PaymentTypeId) IN ('10') then 'paid by Cash' else 'paid by card' end as paidVia"))
                            ->leftjoin('Users','Orders.userId','=','Users.id')
                            ->leftjoin('Outlets','Orders.outletId','=','Outlets.id')
                            ->where('Orders.orderStatus','!=','rejected')
                            ->where(['Orders.deliveryStaffId'=>$staffId])
                            ->whereNull('Orders.acceptedTime')
                            ->first();
        return $orders;
    }


    public function assigned( $orderId,$staffId)
    {
        $update = Orders::where(['id'=>$orderId])
                         ->update(['assignedTime'=>NOW(),'deliveryStaffId'=>$staffId,'orderStatus'=>Constant::ASSIGNED]);

        return $update;

    }

    public function deliveryBoyEarning($data,$staffId)
    {
       $fromDate = $data->fromDate.' 00:00:00';
       $toDate   = $data->toDate.' 23:59:59';
        $perPage = Constant::PERPAGE;
           $orders = DB::table('Orders')
                    ->select(DB::raw("(REPLACE(Orders.orderReferenceId, 'ORDER', '') ) as orderReferenceId,Orders.id,Orders.deliverycharge,Orders.deliveredTime,Outlets.name as outletName"))
                    ->whereBetween('Orders.deliveredTime',[$fromDate,$toDate])
                    ->leftjoin('Outlets','Orders.outletId','=','Outlets.id')
                    ->where('deliveryStaffId',$staffId)
                    ->paginate($perPage, ['*'], 'page', $data->page);
        return $orders;
    }

        public function totalEarning($staffId)
    {
       
           $DeliveryStaffTotalEarnings = DB::table('Orders')
                    ->where('deliveryStaffId',$staffId)
                    ->where('Orders.orderStatus','delivered')
                    ->sum('deliverycharge');
        return $DeliveryStaffTotalEarnings;
    }


public function orderEarningDetails($orderId)
    {

        $earningDetails =DB::table('Orders')->select()
                              ->select(DB::raw("(REPLACE(Orders.orderReferenceId, 'ORDER', '') ) as orderReferenceId,Orders.id,Orders.deliverycharge,Orders.deliveredTime,upper(Orders.orderStatus) as orderStatus,Orders.firstMile,Orders.lastMile,Orders.assignedTime,Orders.destinationReachedTime,Orders.pickedupTime,Orders.destinationReachedTime,Orders.deliveredTime,Outlets.name as outletName,Orders.outletReachedTime"))
                              ->join('Outlets','Orders.outletId','=','Outlets.id')
                              ->where('Orders.id',$orderId)
                              ->first();               

        return $earningDetails;

    }


 public function reachOutlet( $data,$staffId)
    {
        $update = Orders::where(['id'=>$data->orderId])
                         ->update(['outletReachedTime'=>NOW(),'deliveryStaffId'=>$staffId,'orderStatus'=>Constant::REACHOUTLET]);
       

        return $update;

    }

public function reachUserLocation( $data,$staffId)
 {
    
    $update = Orders::where(['id'=>$data->orderId])
                     ->update(['destinationReachedTime'=>NOW(),'deliveryStaffId'=>$staffId,'orderStatus'=>Constant::REACHUSERLOCATION]);
    

    return $update;

}

public function deleteBlockList($orderId)
 {
    
    $update = blockOrderList::where(['orderId'=>$orderId])
                     ->delete();
    

    return $update;

}
}
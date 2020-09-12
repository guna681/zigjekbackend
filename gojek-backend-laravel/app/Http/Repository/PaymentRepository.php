<?php

namespace App\Http\Repository;

use App\IntegrationSetting;
use App\Setting;
use App\Outlets;
use App\Transaction;
use App\DeliveryStaff;
use App\Http\Utility\Constant;
use DB;

Class PaymentRepository
{


    public function listPayMentGateways()
    {
        $path    = url('/').'/images/';
        $data =IntegrationSetting::select(DB::raw("id,name,type,CONCAT('$path',image)as image,status,paymentType"))
                                  ->where(['type'=>Constant::PAYMENT_GATEWAY,'status'=>'1'])
                                  ->get();
        return $data;
    }

 public function checkBalanceOutlet($data)
    {
        $data=Outlets::where('id',$data->id)
        ->where('balanceAmount','>=',$data->amount)
        ->get();
        return $data;
    }


    public function updateOutletBalance($data)
    {
        try {
        $data=Outlets::where('id',$data->id)
        ->update(['balanceAmount' => DB::raw('balanceAmount -'.$data->amount)]);
            $response = false;
        } catch (\Illuminate\ Database\ QueryException $ex) {
            $response = true;
        }
        return $response;
    }


    public function checkBalanceStaff($data)
    {
        $data=DeliveryStaff::where('id',$data->id)
        ->where('balanceAmount','>=',$data->amount)
        ->get();
        return $data;
    }


    public function updateDeliverStaffBalance($data)
    {
        try {
        $data=DeliveryStaff::where('id',$data->id)
        ->update(['balanceAmount' => DB::raw('balanceAmount -'.$data->amount)]);
            $response = false;
        } catch (\Illuminate\ Database\ QueryException $ex) {
            $response = true;
        }
        return $response;
    }


    public function transactionProviderList()
    {
        $data=Transaction::select('Transaction.*','Provider.Id as Provider','Provider.FirstName','Provider.Mobile','Provider.Email','Provider.ExtCode','Provider.IsActive','Provider.OS','Provider.Latitude','Provider.Longitude', 'Provider.totalAmount', 'Provider.Earnings')
        ->where('userType','provider')
        ->leftjoin('Provider','Provider.Id','=','Transaction.userTypeId')
        ->orderBy('Transaction.id','dsc')
        ->paginate(10);
        return $data;
    }

    public function transactionOutletList()
    {
        $data=Transaction::select('Transaction.*','Outlets.id as OutletsId','Outlets.id','Outlets.name','Outlets.image','Outlets.city','Outlets.state','Outlets.country','Outlets.zipcode','Outlets.contactNumber','Outlets.balanceAmount','Outlets.totalAmount','Restaurant.name as restaurantName')
        ->where('userType','outlet')
        ->leftjoin('Outlets','Outlets.id','=','Transaction.userTypeId')
        ->leftjoin('Restaurant','Restaurant.id','=','Outlets.restaurantId')
        ->orderBy('Transaction.id','dsc')
        ->paginate(10);
        return $data;
    }


    public function transactionAdd($insert_date)
    {
        try {
        $data=Transaction::Insert($insert_date);
        $response = false;
        } catch (\Illuminate\ Database\ QueryException $ex) {
            $response = true;
        }
        return $data;
    }


}

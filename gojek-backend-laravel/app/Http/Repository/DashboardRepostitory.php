<?php

namespace App\Http\Repository;


use App\Dishes;
use App\Orders;
use App\Outlets;
use App\OutletsOfferBanners;
use App\User;
use Illuminate\Database\Eloquent;
use App\Http\Utility\Constant;
use App\Http\Utility\Defaults;
use DB;


class DashboardRepostitory
{
    public function getCount($tableName)
    {

        $data = DB::table($tableName)->count();
        return $data;

    }

    public function getRevenue()
    {
    	$revenue = array();
        $orders = Orders::select('netAmount','outletId', 'adminServiceCharge')->get();
        $revenue = array();        
        $adminrevenue = 0;
        $result = (object)array();

        foreach($orders as $order)
        {

            $outletCommision = Outlets::where('id',$order->outletId)->value('restaurantCommission');

            $revenue[] = $order->netAmount;            
            $adminrevenue += $order->adminServiceCharge;


        }
        $result->adminrevenue = number_format($adminrevenue,2);
        $result->revenue = number_format(array_sum($revenue),2);        

         return $result;

    }


    public function getProviderEarnings()
    {

        $data = DB::table('DeliveryStaff')->sum('balanceAmount');
        return $data;

    }


    public function getOutletsEarnings()
    {

        $data = DB::table('Outlets')->sum('balanceAmount');
        return $data;

    }


    // restaurant admin module


    public function getOrderCount($outletId)
    {
        $orders = Orders::where('outletId',$outletId)
                  ->where('Status','completed')
                  ->count();

        return $orders;
    }


    public function gettotalIncome($outletId)
    {

        $orders = Orders::where('outletId',$outletId)
                  ->where('Status','completed')
                  ->sum('Estimation');

        return $orders;

    }

    public function getbalanceIncome($outletId)
    {

        $orders = Orders::where('outletId',$outletId)
                  ->where('Status','completed')
                  ->sum('Estimation');

        return $orders;

    }    


    public function getRejectedOrders($outletId){
        // $orders = Orders::where(['outletId'=>$outletId,'orderStatus'=>Constant::REJECTED])->count();
        $orders = Orders::where(['outletId'=>$outletId,'Status'=>'cancelled'])->count();

        return $orders;

    }

    public function getdishCount($outletId){
        $dish = Dishes::where(['outletId'=> $outletId])->count();

        return $dish;
    }


    public function getregisteredUser()
    {

        $data = User::select(DB::raw( "DATE_FORMAT(created_at, '%M') AS lable,count(id) as Y"))
                     ->groupBy('lable')
                     ->get() ;
        return $data;
    }


    public function getOrdersChart()
    {


        $data = Orders::select(DB::raw( "DATE_FORMAT(created_at, '%d') AS lable,count(id) as Y"))
                         ->whereMonth('created_at', date('m-d-Y', time()))
                         ->groupBy('lable')
                         ->get();
        return $data;

    }


    public function outletOrderchart($outletId)
    {
        $data = Orders::select(DB::raw( "DATE_FORMAT(created_at, '%d') AS lable,count(id) as Y"))
                     ->whereMonth('created_at', date('m-d-Y', time()))
                     ->where('outletId',$outletId)
                     ->groupBy('lable')
                     ->get();

        return $data;
    }


    public function getRevenueChart($outletId)
    {


        $data = Orders::select(DB::raw("DATE_FORMAT(created_at, '%M') AS lable"),DB::raw("SUM(netAmount) as y"))
                             ->where('outletId',$outletId)
                             ->groupBy('lable')
                             ->get();
        return $data;

    }






}
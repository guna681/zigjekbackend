<?php

namespace App\Http\Service\RestaurantAdmin;


use App\Http\Repository\CurrencyRepostitory;
use App\Http\Service\DataService;
use App\Http\Utility\Common;
use Auth;
use App\Http\Repository\DashboardRepostitory;

Class DashboardManagementService
{


    public function getDashboardDetails()
    {

        $outletId = Auth::guard('restaurant')->user()->id;
        $dashboardRepostitory = new DashboardRepostitory();
        $currency         = new CurrencyRepostitory();
        $widegets                = new \stdClass();
        $widegets->totalOrders   = $dashboardRepostitory->getOrderCount($outletId);
        $widegets->totalIncome   = $currency->getCurrency().$dashboardRepostitory->gettotalIncome($outletId);
        $widegets->balanceIncome   = $currency->getCurrency().$dashboardRepostitory->getbalanceIncome($outletId);        
        $widegets->rejectedOrders= $dashboardRepostitory->getrejectedOrders($outletId);
        $widegets->dishes        = $dashboardRepostitory->getdishCount($outletId);

        $data = new DataService();
        $data->error = Common::error_false;
        $data->errorMessage =__('validation.sucess');
        $data->widegets = $widegets;

        return $data;


    }


    public function getOrdersChart()
    {
        $outletId = Auth::guard('restaurant')->user()->id;
        $dashboardRepostitory = new DashboardRepostitory();
        $orders = $dashboardRepostitory->outletOrderchart($outletId);
        $data = new DataService();
        $data->error = Common::error_false;
        $data->errorMessage =__('validation.sucess');
        $data->orders = $orders;

        return $data;
    }



    public function getRevenueChart()
    {
        $outletId = Auth::guard('restaurant')->user()->id;
        $dashboardRepostitory = new DashboardRepostitory();
        $revenue = $dashboardRepostitory->getRevenueChart($outletId);
        $data = new DataService();
        $data->error = Common::error_false;
        $data->errorMessage =__('validation.sucess');
        $data->orders = $revenue;

        return $data;
    }





}
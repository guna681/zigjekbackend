<?php

namespace App\Http\Service\Admin;

use App\Http\Repository\DashboardRepostitory;
use App\Http\Repository\OutletsRepostitory;
use App\Outlets;
use App\Http\Utility\Common;
use App\Http\Utility\Constant;
use App\Http\Repository\CurrencyRepostitory;

Class DashboardService
{

    public function getWidgets()
    {
        $currency         = new CurrencyRepostitory();
        $dashboardRepostitory   = new DashboardRepostitory();
        $widegets               = (object)array();
        $widegets->users        = $dashboardRepostitory->getCount(Constant::USERS);
        $widegets->restaurants  = $dashboardRepostitory->getCount(Constant::RESTAURANT);
        $widegets->outlets      = $dashboardRepostitory->getCount(Constant::OUTLETS);
        $widegets->currency      = $currency->getCurrency();
        $widegets->revenue      = $dashboardRepostitory->getRevenue();
        $widegets->Providersrevenue      = $dashboardRepostitory->getProviderEarnings();
        $widegets->outletsrevenue      = $dashboardRepostitory->getOutletsEarnings();        


        $data               = new DataService();
        $data->error        = Common::error_false;
        $data->errorMessage = __('validation.sucess');
        $data->widgets      = array($widegets);
        return $data;
    }


    public function getUserChart()
    {
        $dashboardRepostitory   = new DashboardRepostitory();

        $getUsers               =$dashboardRepostitory->getregisteredUser();
        $data                   = new DataService();
        $data->error            = Common::error_false;
        $data->errorMessage     = __('validation.sucess');
        $data->registeredUsers  = $getUsers;
        return $data;
    }

    public function getOrderChart()
    {
        $dashboardRepostitory   = new DashboardRepostitory();
        $getOrders               =$dashboardRepostitory->getOrdersChart();
        $data                   = new DataService();
        $data->error            = Common::error_false;
        $data->errorMessage     = __('validation.sucess');
        $data->orders  = $getOrders;
        return $data;
    }



}
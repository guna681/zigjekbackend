<?php

namespace App\Http\Controllers\RestaurantAdmin;

use App\Http\Controllers\Controller;
use App\Http\Service\RestaurantAdmin\DashboardManagementService;
use App\Http\Utility\Defaults;
use Illuminate\Http\Request;


Class  DashboardManagementController extends Controller
{
    /**
     * Handles the request to show a Outlet based on their DashBoardWidgets.
     * @param  int $outletid
     * @return Json
     */


    public function getDashboardDetails(request $request)
    {
        $dashboardManagementService = new DashboardManagementService();
        $response                   = $dashboardManagementService->getDashboardDetails();
        $responsedata               = Defaults::encode($response);
        return $responsedata;
    }

    public function getOrdersChart(request $request)
    {
        $dashboardManagementService = new DashboardManagementService();
        $response                   = $dashboardManagementService->getOrdersChart();
        $responsedata               = Defaults::encode($response);
        return $responsedata;

    }


    public function getRevenueChart(request $request)
    {
        $dashboardManagementService = new DashboardManagementService();
        $response                   = $dashboardManagementService->getRevenueChart();
        $responsedata               = Defaults::encode($response);
        return $responsedata;
    }


}
<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Utility\Common;
use App\Http\Utility\Defaults;
use App\Http\Utility\RequestData;
use App\Http\Service\Admin\DashboardService;
use App\Http\Repository\UserRepository;
use Validator;

class DashboardController extends Controller
{
    /**
     * Get  all widgets details(usercount,outletcount,restaurantcount)
     * @param
     * @return json
     * */

    public function getWidgets(request $request)
    {

        $dashboardService   = new DashboardService();
        $response           = $dashboardService->getWidgets();
        $responsedata       = Defaults::encode($response);
        return $responsedata;

    }


    /*
     * Get the  month wise userRegistraion count
     * @param
     * @return json
     */


    public function getuserChart(request $request)
    {
        $dashboardService  = new DashboardService();
        $response = $dashboardService->getUserChart();
        $responsedata       = Defaults::encode($response);
        return $responsedata;

    }


    public function getOrderChart(request $request)
    {
        $dashboardService  = new DashboardService();
        $response = $dashboardService->getOrderChart();
        $responsedata       = Defaults::encode($response);
        return $responsedata;

    }





}

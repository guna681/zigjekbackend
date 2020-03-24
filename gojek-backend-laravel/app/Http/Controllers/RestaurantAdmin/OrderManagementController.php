<?php

namespace App\Http\Controllers\RestaurantAdmin;

use App\Http\Controllers\Controller;
use App\Http\Service\RestaurantAdmin\OrderManagementService;
use App\Http\Utility\Defaults;
use Illuminate\Http\Request;
use Validator;
use App\Http\Utility\Common;

Class OrderManagementController extends Controller
{


    /**
     * List  Previous Orders  api.
     * delivered and admin rejected orders.
     * @param pageNumber
     * @retrun json
     * */

    public function listPreviousOrders(request $request)
    {
        $orderManagementService = new OrderManagementService();
        $response     = $orderManagementService->listPreviousOrders($request->page);
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }


    /**
     * List OngoinOrders api
     * assigned ,unassigned,pickedup order details
     * @param pageNumber
     * @return json
     */

    public function listOngoingOrders(request $request)
    {
        $orderManagementService = new OrderManagementService();
        $response  = $orderManagementService->listOngoingOrders($request->page);
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }



    /**
     * Get OrdersDetails api
     * @param orderId
     *  usersdetails,deliverystaffdetails,restaurantdetails,dishdetails.
     * @return json
     *  */

    public function getOrders(request $request)
    {
        $response   = new \stdClass();
        $rules      = ['orderId' => 'required'];
        $validator  = Validator::make(['orderId' => $request->orderId], $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $orderManagementService = new OrderManagementService();
            $response               = $orderManagementService->getOrders($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    /**
     * Update an order status in RestaurantAdmin.
     * @param int $id
     * @param Request $request
     * @return boolean
     */

    public function updateOrderStatus(request $request)
    {

        $response   = new \stdClass();
        $rules      = ['orderId' => 'required','orderStatus'=>'required'];
        $validator  = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $data                   = $validator->messages();
            $response->error        = Common::error_true;
            $response->errorMessage = $data->first();
        } else {
            $orderManagementService = new OrderManagementService();
            $response               = $orderManagementService->updateOrderStatus($request);
        }
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }


    public function listAdminOrders(request $request)
    {

        $orderManagementService = new OrderManagementService();
        $response     = $orderManagementService->listAdminOrders($request->page);
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }

    public function listOrdersPopup(request $request)
    {

        $orderManagementService = new OrderManagementService();
        $response     = $orderManagementService->adminListOrdersPopup();
        $responsedata = Defaults::encode($response);
        return $responsedata;

    }    

    public function updateOrderViewStatus(request $request)
    {
        $orderManagementService = new OrderManagementService();
        $response     = $orderManagementService->updateOrderViewStatus();
        $responsedata = Defaults::encode($response);
        return $responsedata;
    }

    }